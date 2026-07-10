import { ImageResponse } from "next/og";
import { SITE_TITLE } from "@/lib/site";

export const dynamic = "force-static";
export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card in the same pen-sketch language as the site:
 * paper background, big ink name, hand-drawn circle around the role.
 * Generated at build time (static export friendly).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          backgroundColor: "#fdfdfb",
          color: "#1a1a1a",
          position: "relative",
        }}
      >
        {/* corner doodles */}
        <svg
          width="90"
          height="90"
          viewBox="0 0 60 60"
          style={{ position: "absolute", top: 48, right: 64 }}
        >
          <path
            d="M30 4 L 30 56 M 4 30 L 56 30 M 12 12 L 48 48 M 48 12 L 12 48"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="180"
          height="70"
          viewBox="0 0 160 80"
          style={{ position: "absolute", bottom: 44, right: 80 }}
        >
          <path
            d="M10 60 C 30 20, 60 16, 70 40 C 78 60, 56 70, 48 52 C 40 34, 80 18, 110 30 C 136 40, 146 56, 152 66"
            fill="none"
            stroke="#8a8a8a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div style={{ display: "flex", fontSize: 34, color: "#4a4a4a" }}>
          Hello, I&apos;m
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 110,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: "-2px",
            marginTop: 8,
          }}
        >
          <span>PHANUWIT</span>
          <span style={{ color: "#8a8a8a" }}>KITTIRONG</span>
        </div>

        {/* role inside a hand-drawn circle */}
        <div
          style={{
            display: "flex",
            position: "relative",
            marginTop: 36,
            width: 680,
            justifyContent: "center",
            padding: "18px 0",
          }}
        >
          <svg
            width="680"
            height="86"
            viewBox="0 0 460 90"
            preserveAspectRatio="none"
            style={{ position: "absolute", top: -6, left: 0 }}
          >
            <path
              d="M230 10 C 90 4, 14 22, 16 46 C 18 72, 120 84, 244 80 C 372 76, 448 62, 444 40 C 440 18, 330 6, 180 12"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: "6px",
            }}
          >
            SENIOR FRONT-END DEVELOPER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 26,
            color: "#4a4a4a",
            gap: 18,
          }}
        >
          <span>big.phanuwit@gmail.com</span>
          <span style={{ color: "#8a8a8a" }}>·</span>
          <span>linkedin.com/in/phanuwit13</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
