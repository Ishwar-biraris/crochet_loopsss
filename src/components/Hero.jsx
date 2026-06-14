import React, { useEffect, useState } from "react";
import heroImg from "../assets/file_000000000b9c71faad7554b26526b4b2.webp";
import heroImgMobile from "../assets/file_00000000c03c720783e3302da1aea784.webp";
import FeaturesStrip from "./FeaturesStrip.jsx";
import Instagramsection from "./Instagramsection.jsx";

// ── Tiny blurred placeholder (generate once with a tool like Squoosh at ~20px wide,
//    then base64-encode it). Replace this string with your actual tiny placeholder.
//    You can generate it by running:
//      npx sharp-cli --input src/assets/IMG_20260501_112102.png \
//        --output placeholder.webp --width 20 --quality 20
//    then base64 the result. Until then, a warm cream fallback colour is used.
const PLACEHOLDER_COLOR = "#f5ede4"; // warm cream — matches your brand

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Poppins:wght@400;500;600&display=swap');

  /* ── HERO SECTION ───────────────────────────────────────────── */
  .hero {
    position: relative;
    min-height: calc(100vh - 73px);
    background-color: ${PLACEHOLDER_COLOR};   /* ← shows instantly while image loads */
    background-size: cover;
    background-position: right center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    /* Smooth transition when real image swaps in */
    transition: background-image 0.4s ease;
  }

  /* Left-side fade so text is always readable */
  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(247, 240, 234, 0.46) 0%,
      rgba(247, 240, 234, 0.09) 38%,
      rgba(247, 240, 234, 0.05) 62%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  /* Skeleton shimmer shown until image loads */
  .hero.is-loading::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      transparent 30%,
      rgba(255,255,255,0.18) 50%,
      transparent 70%
    );
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite linear;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100vh - 73px);
  }

  /* ── CONTENT ─────────────────────────────────────────────────── */
  .hero-content {
    padding: 52px 60px 0;
    max-width: 560px;
  }

  /* Badge */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(252, 228, 228, 0.85);
    border: 1px solid #d4b0b0;
    border-radius: 20px;
    padding: 6px 16px;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: #5a3e36;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  /* Headline */
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 68px;
    line-height: 1.0;
    color: #2e1a10;
    margin: 0 0 20px;
    font-weight: 800;
  }

  .hero-title .pink {
    color: #e88a94;
    font-style: italic;
  }

  .hero-title .sparkle {
    font-size: 36px;
    vertical-align: middle;
    margin-left: 4px;
    font-style: normal;
  }

  /* Description */
  .hero-desc {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    line-height: 1.7;
    color: #5a3e36;
    margin: 0 0 32px;
    max-width: 380px;
  }

  /* Buttons */
  .hero-buttons {
    display: flex;
    gap: 14px;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #e88a94;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 600;
    padding: 13px 28px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    box-shadow: 0 4px 18px rgba(232,138,148,0.35);
  }

  .btn-primary:hover {
    background: #d9707c;
    transform: translateY(-1px);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: #5a3e36;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 12px 26px;
    border-radius: 30px;
    border: 1.5px solid #c5b3a6;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }

  .btn-secondary:hover {
    border-color: #e88a94;
    color: #e88a94;
  }

  /* Decorative doodles */
  .hero-doodle {
    position: absolute;
    pointer-events: none;
    z-index: 2;
  }

  .doodle-heart-outline { top: 14%; left: 46%; }
  .doodle-leaf-left     { top: 18%; left: 42%; }
  .doodle-leaf-right    { top: 18%; left: 52%; }
  .doodle-heart-dashed  { bottom: 28%; left: 3%; }

  /* ── FEATURES AT BOTTOM ──────────────────────────────────────── */
  .hero-features {
    position: relative;
    z-index: 2;
    margin-top: 40px;
  }

  /* Hidden preload image — just used to trigger browser fetch */
  .hero-preload-img {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  /* ── MOBILE ──────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .hero {
      background-position: center top;
      background-size: cover;
      min-height: auto;
    }

    .hero::before {
      background: linear-gradient(
        to bottom,
        rgba(247,240,234,0.55) 0%,
        rgba(247, 240, 234, 0.21) 50%,
        rgba(247, 240, 234, 0.05) 80%,
        rgba(247,240,234,1.00) 100%
      );
    }

    .hero-inner { min-height: auto; }

    .hero-content {
      padding: 36px 20px 0;
      max-width: 100%;
    }

    .hero-title {
      font-size: 42px;
      margin-bottom: 14px;
    }

    .hero-title .sparkle { font-size: 24px; }

    .hero-desc {
      font-size: 14px;
      max-width: 100%;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .btn-primary,
    .btn-secondary {
      width: 50%;
      justify-content: center;
      font-size: 14px;
    }

    .hero-features { margin-top: 300px; }

    .doodle-heart-outline { top: 8%;  left: 68%; }
    .doodle-heart-dashed  { bottom: 46%; left: 2%; }
  }

  @media (max-width: 480px) {
    .hero-title { font-size: 36px; }
    .hero-features { margin-top: 260px; }
  }
`;

const Hero = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const targetImg = isMobile ? heroImgMobile : heroImg;

  useEffect(() => {
    // Imperatively preload the image so we know exactly when it's ready
    const img = new Image();
    img.src = targetImg;
    if (img.complete) {
      setImgLoaded(true);
    } else {
      img.onload = () => setImgLoaded(true);
    }
  }, [targetImg]);

  return (
    <>
      <style>{styles}</style>

      {/*
        Hidden <img> tags with fetchpriority="high" tell the browser to
        download these assets at the highest network priority — same as
        adding a <link rel="preload"> in the <head>.
      */}
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="hero-preload-img"
      />
      <img
        src={heroImgMobile}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="hero-preload-img"
      />

      <section
        className={`hero ${imgLoaded ? "" : "is-loading"}`}
        style={
          imgLoaded
            ? {
                backgroundImage: `url(${isMobile ? heroImgMobile : heroImg})`,
              }
            : undefined // placeholder colour from CSS kicks in
        }
      >
        {/* Decorative SVG doodles */}
        {/* <svg className="hero-doodle doodle-heart-outline" width="48" height="44" viewBox="0 0 48 44" fill="none">
          <path d="M24 40 C20 36, 4 28, 4 16 C4 9, 9 4, 15 4 C19 4, 22 6, 24 9 C26 6, 29 4, 33 4 C39 4, 44 9, 44 16 C44 28, 28 36, 24 40Z"
            stroke="#e88a94" strokeWidth="1.8" fill="none"/>
        </svg> */}

        {/* <svg className="hero-doodle doodle-leaf-left" width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 18 C4 14, 1 8, 5 3 C7 1, 10 2, 8 18Z" stroke="#7ab87a" strokeWidth="1.5" fill="none"/>
        </svg>

        <svg className="hero-doodle doodle-leaf-right" width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 18 C12 14, 15 8, 11 3 C9 1, 6 2, 8 18Z" stroke="#7ab87a" strokeWidth="1.5" fill="none"/>
        </svg> */}

        <svg className="hero-doodle doodle-heart-dashed" width="80" height="60" viewBox="0 0 80 60" fill="none">
          <path d="M10 30 Q20 10, 40 30 Q60 50, 70 30" stroke="#e88a94" strokeWidth="1.5" fill="none"
            strokeDasharray="4 4"/>
        </svg>

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">HANDMADE WITH LOVE ♥</div>

            <h1 className="hero-title">
              Cute stitches,<br />
              <span className="pink">big smiles.</span>
              <span className="sparkle">✦</span>
            </h1>

            <p className="hero-desc">
              Adorable crochet creations made with love to brighten
              your day and warm your heart.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary">Shop Now ♥</button>
            </div>
          </div>

          <div className="hero-features">
            <FeaturesStrip />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;