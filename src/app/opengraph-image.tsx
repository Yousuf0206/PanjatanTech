import { ImageResponse } from "next/og";

export const alt = "PanjatanTech - AI infrastructure for developers";
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
          padding: 80,
          background: "#0B1120",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: "#00E5FF" }} />
          PanjatanTech
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, maxWidth: 960 }}>
            AI infrastructure for teams that ship production AI.
          </div>
          <div style={{ width: 160, height: 6, background: "#A78BFA" }} />
        </div>
      </div>
    ),
    size,
  );
}
