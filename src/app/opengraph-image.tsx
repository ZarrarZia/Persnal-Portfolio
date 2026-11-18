import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Node.js runtime (default): next/og works here and avoids the flaky
// edge-runtime WASM chunk that breaks `next dev` on Windows.
export const alt = `${siteConfig.name} — AI Developer & Agentic AI Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "84px",
          background:
            "radial-gradient(circle at 78% 18%, #2A0F16 0%, #0B0A09 62%)",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Engraved certificate frame */}
        <div
          style={{
            position: "absolute",
            inset: 36,
            border: "1px solid rgba(201,169,97,0.35)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            color: "#C9A961",
            fontSize: 22,
            letterSpacing: 8,
            marginBottom: 30,
            fontFamily: "sans-serif",
          }}
        >
          I — AI DEVELOPER · AGENTIC AI ENGINEER
        </div>

        <div style={{ fontSize: 104, fontWeight: 400, color: "#EDE6DA", lineHeight: 1.0 }}>
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            width: 120,
            height: 1,
            background: "#C9A961",
            marginTop: 34,
            marginBottom: 34,
          }}
        />

        <div style={{ fontSize: 38, color: "#B9AF9F" }}>
          Intelligent systems that think, act &amp; ship.
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 20,
            color: "#8A8175",
            letterSpacing: 4,
            fontFamily: "sans-serif",
          }}
        >
          OPENAI · CLAUDE · GEMINI · RAG · NODE.JS · PYTHON · DOCKER
        </div>
      </div>
    ),
    { ...size }
  );
}
