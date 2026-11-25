import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0e0f11",
          color: "#ecebe6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#7cc4ac", letterSpacing: 4, fontFamily: "monospace" }}>
          FULL-STACK SOFTWARE ENGINEER
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 38, color: "#a4a7ad", lineHeight: 1.3, maxWidth: 960 }}>
            Production software across backend, mobile and AI — and open-source developer tools.
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 24, color: "#7d8086", fontFamily: "monospace" }}>
          <span>TypeScript</span>
          <span>Node.js</span>
          <span>React Native</span>
          <span>LLM features</span>
          <span>MCP</span>
        </div>
      </div>
    ),
    size,
  );
}
