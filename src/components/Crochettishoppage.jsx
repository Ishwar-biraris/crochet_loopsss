
import { useState, useMemo, useRef, useEffect } from "react";
import { PRODUCTS, CATEGORIES, CAT_ACCENT, CAT_LABEL } from "../data/products";

/* ─────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');


  :root {
    --bg:      #f7f0ea;
    --bg2:     #f0ebe2;
    --dark:    #181510;
    --muted:   #7a7060;
    --rose:    #c04858;
    --line:    rgba(24,21,16,.14);
    --card-bg: #f4efe6;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .sp-root {
    background: var(--bg);
    font-family: 'Barlow Condensed', sans-serif;
    min-height: 100vh;
    color: var(--dark);
  }

  /* ── Page header ── */
  .sp-head {
    text-align: center;
    padding: 64px 24px 32px;
    border-bottom: 1px solid var(--line);
  }
  .sp-main-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 8vw, 6rem);
    letter-spacing: .03em;
    line-height: .9;
    color: var(--dark);
  }
  .sp-sub-title {
    font-size: clamp(.85rem, 2vw, 1rem);
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 12px;
    font-weight: 600;
  }

  /* ── Category nav ── */
  .sp-cat-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 32px 24px 0;
  }
  .sp-cat-btn {
    background: none;
    border: none;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: clamp(0.9rem, 1.7vw, 1.15rem);
    letter-spacing: .1em;
    color: var(--muted);
    cursor: pointer;
    padding: 8px 20px;
    position: relative;
    transition: color .2s;
    text-transform: uppercase;
  }
  .sp-cat-btn::after {
    content: '';
    position: absolute;
    bottom: 4px; left: 20px; right: 20px;
    height: 2px;
    background: var(--dark);
    transform: scaleX(0);
    transition: transform .25s ease;
  }
  .sp-cat-btn:hover { color: var(--dark); }
  .sp-cat-btn:hover::after { transform: scaleX(1); }
  .sp-cat-btn.active { color: var(--dark); }
  .sp-cat-btn.active::after { transform: scaleX(1); }

  /* ── Filter Bar ── */
  .sp-filter-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 24px 24px 32px;
  }
  .sp-filter-label {
    font-size: .72rem;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 600;
  }
.sp-select-wrap {
  position: relative;
}

.sp-select-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg2);
  border: 1px solid var(--line);
  padding: 7px 12px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: .78rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--dark);
  font-weight: 600;
  cursor: pointer;
  border-radius: 0;
  white-space: nowrap;
}
.sp-select-trigger:focus-visible {
  outline: 1px solid var(--dark);
}

.sp-select-menu {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  z-index: 99;
  background: var(--bg2);
  border: 1px solid var(--line);
  list-style: none;
  margin: 0;
  padding: 4px 0;
  min-width: 100%;
  white-space: nowrap;
}

.sp-select-option {
  padding: 8px 14px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: .78rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--dark);
  cursor: pointer;
}
.sp-select-option:hover {
  background: var(--line);
}
.sp-select-option.is-active {
  opacity: 0.45;
  pointer-events: none;   /* can't re-select current */
}


  .sp-count {
    margin-left: auto;
    margin-right: 24px;
    font-size: .7rem;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 600;
  }

  /* ── Grid ── */
  .sp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border-top: 1px solid var(--line);
  }
  @media (max-width: 900px) {
    .sp-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .sp-grid { grid-template-columns: 1fr; }
  }

  /* ── Card ── */
  .sp-card {
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    cursor: pointer;
    overflow: hidden;
    background: var(--bg);
    position: relative;
    transition: background .3s;
  }
  .sp-card:nth-child(3n) { border-right: none; }
  @media (max-width: 900px) {
    .sp-card:nth-child(3n) { border-right: 1px solid var(--line); }
    .sp-card:nth-child(2n) { border-right: none; }
  }
  @media (max-width: 560px) {
    .sp-card { border-right: none !important; }
  }
  .sp-card:hover { background: var(--card-bg); }

  /* image block */
  .sp-img {
    width: 100%;
    aspect-ratio: 2/2.3;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .sp-img-bg {
    position: absolute;
    inset: 0;
    transition: transform .6s cubic-bezier(.25,.8,.25,1);
  }
  .sp-card:hover .sp-img-bg { transform: scale(1.05); }

  .sp-product-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .5s cubic-bezier(.25,.8,.25,1);
    z-index: 1;
  }
  .sp-card:hover .sp-product-img { transform: scale(1.06); }

  .sp-emoji {
    font-size: 100px;
    line-height: 1;
    filter: drop-shadow(0 12px 24px rgba(0,0,0,.2));
    transition: transform .5s cubic-bezier(.25,.8,.25,1);
    position: relative;
    z-index: 1;
    user-select: none;
  }
  .sp-card:hover .sp-emoji { transform: scale(1.08) rotate(-5deg); }

  /* badge */
  .sp-img-badge {
    position: absolute;
    top: 14px; left: 14px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: .62rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    padding: 4px 10px;
    background: var(--dark);
    color: #f4ede0;
    z-index: 3;
  }

  /* overlay */
  .sp-overlay {
    position: absolute;
    inset: 0;
    background: rgba(24,21,16,.0);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .35s;
    z-index: 4;
  }
  .sp-card:hover .sp-overlay { background: rgba(24,21,16,.08); }
  .sp-overlay-btn {
    opacity: 0;
    transform: translateY(10px);
    background: var(--dark);
    color: #f4ede0;
    border: none;
    padding: 11px 28px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: .8rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity .3s, transform .3s, background .2s;
  }
  .sp-card:hover .sp-overlay-btn { opacity: 1; transform: translateY(0); }
  .sp-overlay-btn:hover { background: var(--rose); }

  /* card body */
  .sp-card-body {
    padding: 20px 22px 24px;
    border-top: 1px solid var(--line);
  }
  .sp-card-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(1.5rem, 2.7vw, 1.9rem);
    letter-spacing: .04em;
    line-height: 1.05;
    color: var(--dark);
    margin-bottom: 8px;
  }
  .sp-card-category {
    font-size: .62rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .sp-card-desc {
    font-family: 'Crimson Pro', serif;
    font-style: italic;
    font-size: 1.2rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 18px;
  }
  .sp-price-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 14px;
  }
  .sp-price {
    // font-family: 'Bebas Neue', sans-serif;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.6rem;
    color: var(--dark);
    letter-spacing: .04em;
  }
  .sp-old-price {
    font-size: .85rem;
    color: var(--muted);
    text-decoration: line-through;
    letter-spacing: .08em;
    font-weight: 600;
  }
  .sp-save {
    font-size: .62rem;
    letter-spacing: .14em;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--rose);
  }
  .sp-discover-btn {
    display: block;
    width: 100%;
    background: var(--dark);
    color: #f4ede0;
    border: none;
    padding: 13px 20px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: .82rem;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
    transition: background .25s, letter-spacing .25s;
  }
  .sp-discover-btn:hover {
    background: var(--rose);
    letter-spacing: .28em;
  }

  /* category pill on card */
  .sp-cat-pill {
    display: inline-block;
    font-size: .64rem;
    letter-spacing: .18em;
    font-weight: 700;
    text-transform: uppercase;
    padding: 3px 9px;
    border: 1px solid currentColor;
    margin-bottom: 10px;
    opacity: .7;
  }

  /* empty state */
  .sp-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 24px;
  }
  .sp-empty-emoji { font-size: 60px; margin-bottom: 16px; }
  .sp-empty-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    color: var(--muted);
  }

  @keyframes sp-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sp-card { animation: sp-fade-up .45s ease both; }

  /* sort select */
  .sp-sort-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 0 24px 20px;
  }
`;


/* ─────────────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────────────── */
const ProductCard = ({ product, index }) => {
  const { name, category, product: yarn, price, oldPrice,
          badge, image, emoji, bgColor, accent, desc } = product;

  const [added, setAdded] = useState(false);
  const saving = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;


  const [sortOpen, setSortOpen] = useState(false);
const sortRef = useRef(null);

  return (
    <div className="sp-card" style={{ animationDelay: `${index * 0.05}s` }}>
      {/* Image */}
      <div className="sp-img">
        <div
          className="sp-img-bg"
          style={{ background: `radial-gradient(ellipse at 40% 40%, ${bgColor}, ${bgColor}aa)` }}
        />
        {badge && <div className="sp-img-badge">{badge}</div>}
        {image ? (
          <img
            className="sp-product-img"
            src={image}
            alt={name}
            onError={e => { e.target.style.display = "none"; }}
          />
        ) : (
          <span className="sp-emoji">{emoji}</span>
        )}
        <div className="sp-overlay">
          {/* <button
            className="sp-overlay-btn"
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1800); }}
          >
            {"VIEW"}
          </button> */}
        </div>
      </div>

      {/* Body */}
      <div className="sp-card-body">
        <span
          className="sp-cat-pill"
          style={{ color: CAT_ACCENT[category] || accent }}
        >
          {CAT_LABEL[category] || category}
        </span>
        <h3 className="sp-card-name">{name}</h3>
        <p className="sp-card-desc">{desc}</p>
        <div className="sp-price-row">
          <span className="sp-price">₹{price * 1}</span>
          {oldPrice && <span className="sp-old-price">₹{oldPrice * 1}</span>}
          {saving && <span className="sp-save">{saving}%</span>}
        </div>
        <button className="sp-discover-btn">VIEW DETAILS</button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────────────── */
export default function CrochettiShopPage({ externalCategory, externalSort }) {
  const [activeCategory, setActiveCategory] = useState(externalCategory ?? 'all');
  const [sort, setSort] = useState(externalSort ?? 'default');

   useEffect(() => {
    if (externalCategory !== undefined) setActiveCategory(externalCategory);
  }, [externalCategory]);

  useEffect(() => {
    if (externalSort !== undefined) setSort(externalSort);
  }, [externalSort]);

   const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  const sortOptions = [
    { value: 'default',    label: 'FEATURED' },
    { value: 'price-asc',  label: 'PRICE: LOW → HIGH' },
    { value: 'price-desc', label: 'PRICE: HIGH → LOW' },
    { value: 'sale',       label: 'ON SALE' },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p =>
      activeCategory === "all" || p.category === activeCategory
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "sale") list = [...list].filter(p => p.oldPrice);
    return list;
  }, [activeCategory, sort]);

  return (
    <>
      <style>{css}</style>
      <div className="sp-root">

        {/* Header */}
        {/* <div className="sp-head">
          <h1 className="sp-main-title">Shop</h1>
          <p className="sp-sub-title">Handmade Crochet — Keychains · Plushies · Figurines · Hampers</p>
        </div> */}

        {/* Category Nav */}
        <nav className="sp-cat-nav">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className={`sp-cat-btn ${activeCategory === cat.key ? "active" : ""}`}
              onClick={() => { setActiveCategory(cat.key); setSort("default"); }}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Sort + Count */}
        <div className="sp-filter-bar">
  <span className="sp-filter-label">Sort</span>

  <div className="sp-select-wrap" ref={sortRef}>
    <button
      className="sp-select-trigger"
      onClick={() => setSortOpen(o => !o)}
    >
      {sortOptions.find(o => o.value === sort)?.label}
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>

    {sortOpen && (
      <ul className="sp-select-menu">
        {sortOptions.map(opt => (
          <li
            key={opt.value}
            className={`sp-select-option ${sort === opt.value ? 'is-active' : ''}`}
            onClick={() => { setSort(opt.value); setSortOpen(false); }}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    )}
  </div>

  <span className="sp-count">{filtered.length} items</span>
</div>

        {/* Grid */}
        <div className="sp-grid">
          {filtered.length === 0 ? (
            <div className="sp-empty">
              <div className="sp-empty-emoji">🧶</div>
              <p className="sp-empty-text">NO ITEMS FOUND</p>
            </div>
          ) : (
            filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))
          )}
        </div>

      </div>
    </>
  );
}
