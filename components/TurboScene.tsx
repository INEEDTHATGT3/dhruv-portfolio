"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { ParametricGeometry } from "three/addons/geometries/ParametricGeometry.js";
import type { RenderTier } from "@/hooks/useHardwareDetection";

const ACCENT = "#c8102e";
const BLADE_PAIRS = 6; // 6 full blades + 6 splitters
const BLADES = Array.from({ length: BLADE_PAIRS * 2 }, (_, i) => ({
  start: i % 2 ? 0.42 : 0, // splitters begin partway down the passage
  phase: (i * Math.PI) / BLADE_PAIRS,
}));

// Meridional section of a centrifugal compressor wheel, t = 0 at the inducer (top) to 1 at the exducer.
const quarter = (t: number) => [Math.cos((t * Math.PI) / 2), Math.sin((t * Math.PI) / 2)];
const hub = (t: number) => {
  const [c, s] = quarter(t);
  return [1.15 - 0.97 * c, 0.85 - 1.23 * s];
};
const shroud = (t: number) => {
  const [c, s] = quarter(t);
  return [1.28 - 0.66 * c, 0.85 - 1.21 * s];
};

// Blade surface: u runs inducer -> exducer, v runs hub -> shroud.
const bladePoint = (start: number, phase: number) => (u: number, v: number, out: THREE.Vector3) => {
  const t = start + (1 - start) * u;
  const [rh, yh] = hub(t);
  const [rs, ys] = shroud(t);
  const r = rh + (rs - rh) * v;
  const theta = phase + (1 - t) ** 2 * (0.95 + 0.35 * v); // swept at the inducer, radial at the exducer
  out.set(r * Math.cos(theta), yh + (ys - yh) * v, r * Math.sin(theta));
};

// One blade's outline (hub line, trailing edge, shroud line, leading edge) as line-segment pairs.
function bladeOutline(start: number, phase: number) {
  const f = bladePoint(start, phase);
  const uv: [number, number][] = [];
  for (let i = 0; i <= 16; i++) uv.push([i / 16, 0]);
  for (let i = 1; i <= 3; i++) uv.push([1, i / 3]);
  for (let i = 15; i >= 0; i--) uv.push([i / 16, 1]);
  for (let i = 2; i >= 0; i--) uv.push([0, i / 3]);
  const pts = uv.map(([u, v]) => {
    const p = new THREE.Vector3();
    f(u, v, p);
    return p;
  });
  return new THREE.BufferGeometry().setFromPoints(pts.slice(1).flatMap((p, i) => [pts[i], p]));
}

function hubBody(segments: number, arcSteps: number) {
  const profile = [
    [0, 0.97],
    [0.14, 0.95],
  ];
  for (let i = 0; i <= arcSteps; i++) profile.push(hub(i / arcSteps));
  profile.push([1.34, -0.42], [1.36, -0.5], [1.2, -0.58], [0, -0.58]);
  // Lathe normals face outward when the profile runs bottom to top.
  return new THREE.LatheGeometry(
    profile.reverse().map(([x, y]) => new THREE.Vector2(x, y)),
    segments,
  );
}

// PBR: machined aluminium lit by a procedural studio (no HDR download) plus a red rim light.
// Eco: a CAD-style hidden-line drawing; unlit white fills pushed back with polygon offset hide
// the lines behind them. The hub keeps its grid edges, blades get clean outlines.
function build(tier: Exclude<RenderTier, "off">) {
  if (tier === "pbr") {
    const material = new THREE.MeshPhysicalMaterial({
      color: "#cfd3d8",
      metalness: 1,
      roughness: 0.24,
      clearcoat: 0.35,
      clearcoatRoughness: 0.25,
      side: THREE.DoubleSide,
    });
    const solids = [
      hubBody(96, 24),
      ...BLADES.map(({ start, phase }) => new ParametricGeometry(bladePoint(start, phase), 28, 6)),
      new THREE.CylinderGeometry(0.12, 0.12, 0.12, 6).translate(0, 1.02, 0), // nose nut
    ];
    return { solids, surface: material, lines: [] as THREE.BufferGeometry[], ink: null };
  }
  const hubGeo = hubBody(24, 6);
  return {
    solids: [hubGeo, ...BLADES.map(({ start, phase }) => new ParametricGeometry(bladePoint(start, phase), 8, 2))],
    surface: new THREE.MeshBasicMaterial({
      color: "#ffffff",
      toneMapped: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    }),
    lines: [new THREE.EdgesGeometry(hubGeo, 10), ...BLADES.map(({ start, phase }) => bladeOutline(start, phase))],
    ink: new THREE.LineBasicMaterial({ color: ACCENT, toneMapped: false }),
  };
}

function Studio() {
  const gl = useThree((s) => s.gl);
  const env = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    return texture;
  }, [gl]);
  useEffect(() => () => env.dispose(), [env]);
  return (
    <>
      <primitive object={env} attach="environment" />
      <directionalLight position={[2.5, 4, 2]} intensity={1.4} />
      <pointLight position={[-2.2, -0.4, -1.6]} color={ACCENT} intensity={16} distance={8} />
    </>
  );
}

type WheelProps = {
  tier: Exclude<RenderTier, "off">;
  reduced: boolean;
  hover: RefObject<boolean>;
  onBoost: (bar: number) => void;
};

function Wheel({ tier, reduced, hover, onBoost }: WheelProps) {
  const group = useRef<THREE.Group>(null);
  const spool = useRef(0);
  const lastY = useRef<number | null>(null);
  const parts = useMemo(() => build(tier), [tier]);
  useEffect(
    () => () => {
      [...parts.solids, ...parts.lines].forEach((g) => g.dispose());
      parts.surface.dispose();
      parts.ink?.dispose();
    },
    [parts],
  );

  useFrame((_, dt) => {
    // Scroll speed (px/s) and hovering both feed boost; it spools up fast and winds down slowly.
    const y = window.scrollY;
    const speed = lastY.current === null ? 0 : Math.abs(y - lastY.current) / Math.max(dt, 1 / 240);
    lastY.current = y;
    const target = Math.max(Math.min(speed / 2500, 1), hover.current ? 0.55 : 0);
    const rate = target > spool.current ? 3 : 0.8;
    spool.current += (target - spool.current) * Math.min(dt * rate, 1);
    if (group.current && !reduced) group.current.rotation.y -= dt * (0.5 + 22 * spool.current);
    onBoost(spool.current * 1.8);
  });

  return (
    <group ref={group} rotation={[0.18, 0, 0.08]}>
      {parts.solids.map((g) => (
        <mesh key={g.uuid} geometry={g} material={parts.surface} />
      ))}
      {parts.ink && parts.lines.map((g) => <lineSegments key={g.uuid} geometry={g} material={parts.ink} />)}
    </group>
  );
}

export default function TurboScene({ tier }: { tier: Exclude<RenderTier, "off"> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const hover = useRef(false);
  const [visible, setVisible] = useState(true);
  const [reduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  // Written straight to the DOM every frame; a React state update per frame would re-render the scene.
  const onBoost = useCallback((bar: number) => {
    if (readout.current) readout.current.textContent = `${bar.toFixed(2)} bar`;
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className="absolute inset-0"
      onPointerEnter={() => (hover.current = true)}
      onPointerLeave={() => (hover.current = false)}
    >
      <Canvas
        aria-hidden
        frameloop={visible && !reduced ? "always" : "demand"}
        dpr={tier === "pbr" ? [1, 2] : 1}
        camera={{ position: [0, 3.2, 4.8], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: tier === "pbr" ? "high-performance" : "low-power" }}
        onCreated={({ camera }) => camera.lookAt(0, -0.15, 0)}
      >
        {tier === "pbr" && <Studio />}
        <Wheel tier={tier} reduced={reduced} hover={hover} onBoost={onBoost} />
      </Canvas>
      <p className="pointer-events-none absolute top-3 right-4 font-mono text-xs text-graphite">
        Boost{" "}
        <span ref={readout} className="text-ink tabular-nums">
          0.00 bar
        </span>
      </p>
    </div>
  );
}
