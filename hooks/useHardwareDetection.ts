"use client";
import { useState, useSyncExternalStore } from "react";

export type RenderTier = "pbr" | "wire" | "off";

// Integrated or software GPUs get the wireframe; discrete GPUs and Apple silicon get PBR materials.
// ponytail: renderer-string heuristic, swap for a measured frame-time probe if it misjudges real devices.
const LOW_POWER = /intel|swiftshader|llvmpipe|software|basic render|radeon\(tm\) graphics|radeon (r\d )?5\d0|vega \d/i;

let detected: RenderTier | undefined;

function detect(): RenderTier {
  if (detected) return detected;
  if (!matchMedia("(min-width: 768px)").matches) return (detected = "off"); // phones: skip 3D entirely
  const gl = document.createElement("canvas").getContext("webgl");
  if (!gl) return (detected = "off");
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return (detected = LOW_POWER.test(renderer) ? "wire" : "pbr");
}

const subscribe = () => () => {};

// null until hydrated, so the server render and first client render match.
export function useHardwareDetection() {
  const auto = useSyncExternalStore(subscribe, detect, () => null);
  const [manual, setManual] = useState<RenderTier | null>(null);
  return [manual ?? auto, setManual] as const;
}
