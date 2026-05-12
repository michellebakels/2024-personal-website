import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fafaf9",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Border like website header */}
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "#78716c",
            position: "absolute",
            top: "80px",
          }}
        />

        {/* Name section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "100px",
            paddingTop: "140px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "300",
              color: "#1c1917",
              letterSpacing: "4px",
              marginBottom: "40px",
            }}
          >
            MICHELLE BAKELS
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "24px",
              color: "#57534e",
              letterSpacing: "1px",
              lineHeight: "40px",
            }}
          >
            Software Developer
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#57534e",
              letterSpacing: "1px",
              lineHeight: "40px",
            }}
          >
            Community Builder
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#57534e",
              letterSpacing: "1px",
              lineHeight: "40px",
            }}
          >
            Conference Organizer
          </div>

          {/* Button style element */}
          <div
            style={{
              marginTop: "60px",
              width: "180px",
              height: "50px",
              border: "2px solid #1c1917",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#1c1917",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: "400",
              }}
            >
              LEARN MORE
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            width: "100%",
            height: "60px",
            background: "#292524",
            position: "absolute",
            bottom: "0",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
