"use client";
import dynamic from "next/dynamic";
import { useHardwareDetection } from "@/hooks/useHardwareDetection";

// three.js loads only after the page is interactive, and never on phones.
const TurboScene = dynamic(() => import("./TurboScene"), { ssr: false });

const TIER_LABEL = {
  pbr: "Discrete GPU: PBR materials",
  wire: "Integrated GPU: wireframe",
};

export default function TurboHero() {
  const [tier, setTier] = useHardwareDetection();
  if (tier === "off") return null;

  return (
    <figure className="drafting relative hidden aspect-square w-full overflow-hidden rounded-lg border border-rule md:block">
      <p className="pointer-events-none absolute top-3 left-4 z-10 font-mono text-xs text-graphite">
        Fig. 1 — Compressor wheel
      </p>
      {tier && <TurboScene tier={tier} />}
      {tier && (
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-rule bg-panel/80 px-4 py-2.5 font-mono text-xs text-graphite backdrop-blur-sm">
          <span>{TIER_LABEL[tier]}</span>
          <button type="button" className="link shrink-0" onClick={() => setTier(tier === "pbr" ? "wire" : "pbr")}>
            Show {tier === "pbr" ? "wireframe" : "PBR"}
          </button>
        </figcaption>
      )}
    </figure>
  );
}
