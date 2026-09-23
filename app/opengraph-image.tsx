import { ImageResponse } from "next/og";
import resume from "@/content/resume.json";
import { site } from "@/content/site";
import { availability } from "@/lib/profile";

export const alt = `${resume.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A static Google Fonts subset containing just `text`; null when offline.
async function googleFont(family: string, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return src ? await (await fetch(src)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const name = resume.name.toUpperCase();
  const [first, ...rest] = name.split(" ");
  const latest = resume.experience[0];
  const footer = latest ? `${latest.role} · ${latest.org}` : "";
  const [display, body] = await Promise.all([
    googleFont("Archivo:wdth,wght@125,800", name),
    googleFont("Archivo:wght@400", `${availability}${site.role}${footer}`),
  ]);
  // All or nothing: a partial set would mix typefaces glyph by glyph.
  const fonts =
    display && body
      ? [
          { name: "Archivo Expanded", data: display, weight: 800 as const },
          { name: "Archivo", data: body, weight: 400 as const },
        ]
      : undefined;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#f4f5f6",
        color: "#121417",
        borderTop: "14px solid #c8102e",
        fontFamily: fonts ? "Archivo" : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#5b6168" }}>
        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#c8102e" }} />
        {availability}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: fonts ? "Archivo Expanded" : undefined,
          fontWeight: 800,
          fontSize: 124,
          lineHeight: 0.9,
          letterSpacing: -3,
        }}
      >
        <span>{first}</span>
        <span>{rest.join(" ")}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#5b6168" }}>
        <span>{site.role}</span>
        <span>{footer}</span>
      </div>
    </div>,
    { ...size, fonts },
  );
}
