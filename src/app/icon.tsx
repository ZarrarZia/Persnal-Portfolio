import { ImageResponse } from "next/og";

// Node.js runtime (default) — avoids the edge-runtime WASM chunk issue.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0A09",
          border: "1px solid #C9A961",
          borderRadius: 2,
          color: "#C9A961",
          fontSize: 20,
          fontWeight: 400,
          fontFamily: "Georgia, serif",
        }}
      >
        Z
      </div>
    ),
    { ...size }
  );
}
