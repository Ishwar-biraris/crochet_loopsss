import { useState } from "react";

const POSTS = [
  { id: 1, img: "/instaPost/IMG_20260614_113436.jpg", caption: "Summer tote drop" },
  { id: 2, img: "/instaPost/IMG_20260614_113455.jpg", caption: "Cozy forest scarf" },
  { id: 3, img: "/instaPost/IMG_20260614_113512.jpg", caption: "Boho wall art" },
  { id: 4, img: "/instaPost/IMG_20260614_113557.jpg", caption: "WIP: weekend bag" },
  { id: 5, img: "/instaPost/IMG_20260614_113629.jpg", caption: "Spring collection" },
  { id: 6, img: "/instaPost/IMG_20260614_113644.jpg", caption: "Customer love" },
  { id: 7, img: "/instaPost/IMG_20260614_113656.jpg", caption: "Sunflower coaster" },
  { id: 8, img: "/instaPost/IMG_20260614_113707.jpg", caption: "New yarn haul" },
  { id: 9, img: "/instaPost/IMG_20260614_113721.jpg", caption: "Gift wrapping" },
];

const likes = [247, 189, 412, 134, 521, 308, 176, 443, 92];

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const InstaIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

function PostTile({ post, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        aspectRatio: "1 / 1.15",
        overflow: "hidden",
        cursor: "pointer",
        animation: "fadeUp 0.45s ease both",
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <img
        src={post.img}
        alt={post.caption}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.35s ease",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.42)",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "6px",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}>
        {/* <HeartIcon />
        <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
          {likes[index]}
        </span> */}
      </div>
    </div>
  );
}

export default function Instagramsection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ig-wrapper {
          background: #faf5f0;
          padding: clamp(40px, 7vw, 80px) 0 clamp(40px, 6vw, 72px);
        }

        .ig-inner {
          width: 90%;
          margin: 0 auto;
          font-family: 'DM Sans', sans-serif;
        }

        .ig-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: clamp(20px, 3vw, 32px);
        }

        .ig-strip::before,
        .ig-strip::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #d8c9ba;
        }

        .ig-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
        }

        @media (max-width: 480px) {
          .ig-grid { gap: 2px; }
        }

        .ig-view-btn:hover {
          background: #f0e8df !important;
        }
      `}</style>

      <div className="ig-wrapper">
        <div className="ig-inner">

          {/* Separator strip */}
          <div className="ig-strip" style={{ animation: "fadeUp 0.4s ease both" }}>
            <span style={{
              fontSize: "clamp(10px, 2vw, 11px)",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#b87c4a",
              whiteSpace: "nowrap",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Follow along
            </span>
          </div>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "clamp(28px, 5vw, 48px)", animation: "fadeUp 0.4s ease 0.07s both" }}>
            <h2 style={{
              margin: "0 0 8px",
              fontSize: "clamp(26px, 5vw, 42px)",
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              color: "#1a1208",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}>
              Meet us on Instagram
            </h2>
            {/* <p style={{
              margin: 0,
              fontSize: "clamp(13px, 2.2vw, 15px)",
              color: "#9a7a65",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Peek into our world on Instagram
            </p> */}
          </div>

          {/* Avatar + handle */}
          {/* Avatar + handle */}
<div style={{
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "clamp(20px, 4vw, 32px)",
  animation: "fadeUp 0.4s ease 0.13s both",
}}>
  <img
  src="/37941-modified.png" // or your profile image path
  alt="Instagram Profile"
  style={{
    width: "clamp(68px, 14vw, 88px)",
    height: "clamp(68px, 14vw, 88px)",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "12px",
    border: "3px solid #fff",
    outline: "2px solid #c4d9bc",
  }}
/>
  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
    <InstaIcon size={15} color="#b87c4a" />
    <p style={{ margin: 0, fontSize: "clamp(15px, 3vw, 18px)", fontWeight: 600, color: "#1a1208", letterSpacing: "-0.01em" }}>
      @crochet_loopsss
    </p>
  </div>
  <p style={{ margin: 0, fontSize: "clamp(12px, 2vw, 13px)", color: "#9a7a65" }}>
    Handmade crochet pieces
  </p>
</div>

          {/* Thin rule before grid */}
          <div style={{ borderTop: "1px solid #e4d8cc", marginBottom: "4px", animation: "fadeUp 0.4s ease 0.18s both" }} />

          {/* Grid */}
          <div className="ig-grid">
            {POSTS.map((post, i) => (
              <PostTile key={post.id} post={post} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "clamp(16px, 3vw, 28px)", animation: "fadeUp 0.4s ease 0.65s both" }}>
            <a
              href="https://instagram.com/crochet_loopsss"
              target="_blank"
              rel="noopener noreferrer"
              className="ig-view-btn"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "clamp(12px, 2.5vw, 13px)",
                fontWeight: 600,
                color: "#2d1f14",
                textDecoration: "none",
                border: "1px solid #ddd0c4",
                borderRadius: "24px",
                padding: "10px 24px",
                background: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.15s",
              }}
            >
              <InstaIcon size={15} color="#b87c4a" />
              Visit us on Instagram
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
