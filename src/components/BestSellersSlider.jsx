import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { PRODUCTS } from "../data/products";


/* ─── Styles ─────────────────────────────────────────── */
const swiperCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');

@font-face {
  font-family: 'cherry';
  src: url('./fonts/Montserrat/Montserrat-VariableFont_wght.woff2') format('woff2');
  font-display: swap;
}

  :root {
    --cream:    #faf6f0;
    --sand:     #ede8df;
    --card-bg:  #f4efe6;
    --dark:     #2a1f14;
    --muted:    #9a8f82;
    --yarn-1:   #c0785a;
    --yarn-2:   #6b8f71;
    --yarn-3:   #8a6fa0;
    --yarn-4:   #c9a84c;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .bs-root {
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    padding: 56px 0 72px;
    overflow: hidden;
  }

  /* ── Header ── */
  .bs-header {
    text-align: center;
    padding: 0 24px 48px;
  }
  .bs-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5.5vw, 4rem);
    letter-spacing: 0.02em;
    line-height: 1.1;
    color: var(--dark);
  }
  .bs-tagline {
    font-size: .82rem;
    color: var(--muted);
    letter-spacing: .16em;
    text-transform: uppercase;
    margin-top: 8px;
  }
  .bs-line {
    width: 40px; height: 2px;
    background: var(--yarn-1);
    margin: 14px auto 0;
    border-radius: 2px;
  }

  /* ── Swiper overrides ── */
  .bs-swiper {
    padding: 16px 40px 64px !important;
  }
  .bs-swiper .swiper-slide {
    height: auto;
  }

  /* ── Card ── */
  .bs-card {
    // background: var(--card-bg);
    // border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: 540px;
    // max-height: 700px;
    position: relative;
    cursor: pointer;
    transition: transform .4s cubic-bezier(.25,.8,.25,1),
                box-shadow .4s cubic-bezier(.25,.8,.25,1);
    overflow: hidden;
    // border: 1px solid rgba(42,31,20,.07);
  }
  .bs-card:hover {
    transform: translateY(-8px);
    // box-shadow: 0 24px 48px rgba(42,31,20,.13);
  }
  .bs-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--accent-color, var(--yarn-1));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .4s ease;
    z-index: 10;
    border-radius: 12px 12px 0 0;
  }
  .bs-card:hover::before { transform: scaleX(1); }

  /* ── Badge ── */
  .bs-badge {
    position: absolute;
    top: 12px; right: 12px;
    color: #fff;
    font-size: .58rem;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: 5px 10px;
    border-radius: 20px;
    z-index: 5;
    backdrop-filter: blur(4px);
  }

  /* ── Image ── */
  .bs-visual {
    flex: 1;
    overflow: hidden;
    position: relative;
    border-radius: 30px;
  }
  .bs-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .6s cubic-bezier(.25,.8,.25,1);
    display: block;
  }
  .bs-card:hover .bs-img {
    transform: scale(1.06);
  }

  /* ── Text block ── */
  .bs-text {
    padding: 14px 16px 4px;
    flex: 0 0 auto;
  }
  .bs-subtitle {
    font-size: .65rem;
    font-weight: 500;
    letter-spacing: .13em;
    text-transform: uppercase;
    color: var(--muted);
    line-height: 1.5;
    margin-bottom: 3px;
  }
  .bs-name {
    font-family: 'Playfair Display', serif;
    font-family: 'cherry';
    font-size: 1.15rem;
    letter-spacing: .01em;
    color: var(--dark);
    line-height: 1.2;
  }

  /* ── CTA ── */
  .bs-cta {
    padding: 5px 16px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .bs-price {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: var(--dark);
    font-family: 'cherry';
  }
  .bs-btn {
    background: var(--dark);
    color: var(--cream);
    border: none;
    padding: 9px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: .65rem;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    transition: background .3s ease, transform .2s ease;
  }
  .bs-btn:hover {
    background: var(--accent-color, var(--yarn-1));
    transform: scale(1.04);
  }
  .bs-btn span { position: relative; z-index: 1; }

  /* ── Nav ── */
  .bs-nav-prev, .bs-nav-next {
    position: absolute;
    top: 50%; transform: translateY(-50%);
    z-index: 20;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--cream);
    border: 1.5px solid rgba(42,31,20,.15);
    box-shadow: 0 4px 16px rgba(0,0,0,.08);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background .25s, transform .25s, border-color .25s;
    color: var(--dark);
  }
  .bs-nav-prev { left: 8px; }
  .bs-nav-next { right: 8px; }
  .bs-nav-prev:hover, .bs-nav-next:hover {
    background: var(--dark);
    color: var(--cream);
    transform: translateY(-50%) scale(1.08);
    border-color: transparent;
  }

  /* ── Pagination ── */
  .bs-swiper .swiper-pagination-bullet {
    background: var(--muted);
    opacity: .35;
    width: 8px; height: 8px;
    transition: all .3s;
  }
  .bs-swiper .swiper-pagination-bullet-active {
    background: var(--yarn-1);
    opacity: 1;
    width: 24px;
    border-radius: 4px;
  }

  /* ── Slide fade-in ── */
  .bs-swiper .swiper-slide {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity .45s ease, transform .45s ease;
  }
  .bs-swiper .swiper-slide-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    .bs-swiper { padding: 12px 12px 56px !important; }
    .bs-card { height: 500px; }
  }
`;

/* ─── Arrow Icons ──────────────────────────────────── */
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* ─── Card Component ───────────────────────────────── */
const ProductCard = ({ product }) => {
  const { desc, name, price, accent, badge, image } = product;
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bs-card" style={{ "--accent-color": accent }}>
      {badge && (
        <div className="bs-badge" style={{ background: accent }}>{badge}</div>
      )}

      {/* Product Image */}
      <div className="bs-visual">
        <img src={image} alt={name} className="bs-img" />
      </div>

      {/* Text */}
      <div className="bs-text">
        <p className="bs-subtitle">{desc}</p>
        <h3 className="bs-name">{name}</h3>
      </div>

      {/* CTA */}
      <div className="bs-cta">
        <span className="bs-price">₹{price * 40}</span>
        <button className="bs-btn" onClick={handleAdd} style={{ "--accent-color": accent }}>
          <span>{"View Details"}</span>
        </button>
      </div>
    </div>
  );
};

/* ─── Main Component ───────────────────────────────── */
export default function BestSellersSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <style>{swiperCSS}</style>

      <section className="bs-root">
        {/* Header */}
        <div className="bs-header">
          <h2 className="bs-title">Our Best Sellers</h2>
          <p className="bs-tagline">Handcrafted with love · One stitch at a time</p>
          <div className="bs-line" />
        </div>

        {/* Slider */}
        <div style={{ position: "relative" }}>
          <button ref={prevRef} className="bs-nav-prev" aria-label="Previous">
            <ChevronLeft />
          </button>
          <button ref={nextRef} className="bs-nav-next" aria-label="Next">
            <ChevronRight />
          </button>

          <Swiper
            className="bs-swiper"
            modules={[Navigation, Pagination, A11y, Autoplay]}
            loop={true}
            grabCursor={true}
            watchSlidesProgress={true}
            autoplay={{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0:    { slidesPerView: 1.2, spaceBetween: 16 },
              480:  { slidesPerView: 1.6, spaceBetween: 20 },
              680:  { slidesPerView: 2.2, spaceBetween: 24 },
              900:  { slidesPerView: 3,   spaceBetween: 28 },
              1100: { slidesPerView: 3.5, spaceBetween: 32 },
            }}
            onProgress={(swiper) => {
              swiper.slides.forEach((slide) => {
                const progress = Math.abs(slide.progress ?? 0);
                if (progress < swiper.params.slidesPerView) {
                  slide.classList.add("swiper-slide-visible");
                } else {
                  slide.classList.remove("swiper-slide-visible");
                }
              });
            }}
            onInit={(swiper) => {
              swiper.slides.forEach((slide) => {
                slide.classList.add("swiper-slide-visible");
              });
            }}
          >
            {PRODUCTS.filter(p => p.badge === "BEST SELLER").map((product) => (
  <SwiperSlide key={product.id}>
    <ProductCard product={product} />
  </SwiperSlide>
))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
