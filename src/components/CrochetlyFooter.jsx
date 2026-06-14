import { useState } from 'react';

const Instagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const YouTube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);
const Pinterest = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.087-.791-.166-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.329-.236.995.499 1.806 1.476 1.806 1.772 0 3.136-1.867 3.136-4.561 0-2.385-1.715-4.052-4.163-4.052-2.836 0-4.498 2.126-4.498 4.324 0 .856.33 1.773.742 2.276a.3.3 0 0 1 .069.284c-.076.313-.244.995-.277 1.134-.044.183-.146.221-.337.133-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const BRAND = {
  name: 'Crochet Loopss',
  tagline: 'Whimsical crochet creations made with love.',
  sub: 'Thank you for supporting handmade! 🩷',
  socials: [
    { icon: <Instagram />, label: 'Instagram',  href: 'https://instagram.com' },
    { icon: <YouTube />,   label: 'YouTube',    href: 'https://youtube.com' },
    { icon: <Pinterest />, label: 'Pinterest',  href: 'https://pinterest.com' },
  ],
};

// Category key must match your PRODUCTS data category values
const COLLECTIONS = [
  { label: 'All Products',       value: 'all' },
  { label: 'Keychains',          value: 'keychains' },
  { label: 'Plushies',           value: 'plushies' },
  { label: 'Character Figurines',value: 'figurines' },
  { label: 'Hampers',            value: 'hampers' },
];

const SORT_OPTIONS = [
  { label: 'Featured',           value: 'default' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'On Sale',            value: 'sale' },
];

function AccordionColumn({ title, children, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(120,80,80,0.12)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '14px 0', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', cursor: 'pointer',
          color: '#5a3a3a', fontFamily: "'Nunito', sans-serif",
        }}
        aria-expanded={isOpen}
      >
        <span style={S.colTitle}>{title}</span>
        <ChevronDown open={isOpen} />
      </button>
      <div style={{
        overflow: 'hidden', transition: 'max-height 0.3s ease',
        maxHeight: isOpen ? '300px' : '0px',
        display: 'flex', flexDirection: 'column', gap: '10px',
        paddingBottom: isOpen ? '14px' : '0',
      }}>
        {children}
      </div>
    </div>
  );
}

function LinkBtn({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...S.link,
        color: isActive ? '#664b4bdb' : '#5a3a3aa6',
        fontWeight: isActive ? 700 : undefined,
        background: 'none', border: 'none', padding: 0,
        cursor: 'pointer', textAlign: 'left',
      }}
    >
      {label}
    </button>
  );
}

function BrandBlock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
      <h2 style={S.brandName}>{BRAND.name}</h2>
      <p style={S.tagline}>{BRAND.tagline}</p>
      <p style={S.tagline}>{BRAND.sub}</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {BRAND.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            aria-label={s.label} className="cf-social" style={S.socialIcon}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function CrochetlyFooter({ onFilter, activeFilter = { category: 'all', sort: 'default' } }) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (key) =>
    setOpenAccordion(prev => (prev === key ? null : key));

  const handleCategory = (value) => {
    onFilter?.({ category: value, sort: activeFilter.sort });
  };

  const handleSort = (value) => {
    onFilter?.({ category: activeFilter.category, sort: value });
  };

  const renderCollections = (mobile = false) =>
    COLLECTIONS.map(({ label, value }) => (
      <LinkBtn
        key={value}
        label={label}
        isActive={activeFilter.category === value}
        onClick={() => handleCategory(value)}
      />
    ));

  const renderSortOptions = (mobile = false) =>
    SORT_OPTIONS.map(({ label, value }) => (
      <LinkBtn
        key={value}
        label={label}
        isActive={activeFilter.sort === value}
        onClick={() => handleSort(value)}
      />
    ));

  return (
    <footer style={S.footer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito:wght@400;500;600&display=swap');
        .cf-root * { box-sizing: border-box; }
        .cf-desktop { display: flex !important; }
        .cf-mobile  { display: none  !important; }
        @media (max-width: 680px) {
          .cf-desktop { display: none  !important; }
          .cf-mobile  { display: block !important; }
        }
        .cf-social:hover {
          background: rgba(160,90,90,0.18) !important;
          transform: translateY(-2px);
        }
        .cf-link-btn:hover { color: #8b3a52 !important; }
      `}</style>

      <div className="cf-root">

        {/* Desktop */}
        <div className="cf-desktop" style={{
          alignItems: 'flex-start', justifyContent: 'space-between',
          gap: '40px', paddingBottom: '40px',
        }}>
          <div style={{ flex: '0 0 auto', maxWidth: '260px' }}>
            <BrandBlock />
          </div>
          <div style={{ display: 'flex', gap: '70px', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={S.colTitle}>Collections</p>
              {renderCollections()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={S.colTitle}>Filter</p>
              {renderSortOptions()}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="cf-mobile" style={{ paddingBottom: '8px' }}>
          <div style={{ paddingBottom: '24px' }}><BrandBlock /></div>
          <div style={{ height: '1px', background: 'rgba(120,80,80,0.12)', marginBottom: '4px' }} />
          <AccordionColumn
            title="Collections"
            isOpen={openAccordion === 'collections'}
            onToggle={() => toggleAccordion('collections')}
          >
            {renderCollections(true)}
          </AccordionColumn>
          <AccordionColumn
            title="Filter"
            isOpen={openAccordion === 'filter'}
            onToggle={() => toggleAccordion('filter')}
          >
            {renderSortOptions(true)}
          </AccordionColumn>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(120,80,80,0.15)', padding: '18px 0',
          display: 'flex', alignItems: 'center',
        }}>
          <span style={{ fontSize: '12px', color: 'rgba(90,58,58,0.55)' }}>
            © 2025 Crochetti. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}

const BG = '#F5EDE8';
const S = {
  footer: { backgroundColor: BG, color: '#5a3a3a', fontFamily: "'Nunito', sans-serif", padding: '48px 48px 0' },
  brandName: { fontFamily: "'Lora', serif", fontSize: '24px', fontWeight: 700, margin: '0 0 2px', letterSpacing: '-0.3px', color: '#3d2020' },
  tagline: { fontSize: '15px', color: 'rgba(90,58,58,0.65)', margin: 0, lineHeight: '1.55' },
  socialIcon: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(160,90,90,0.1)', color: '#7a3a4a', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s', flexShrink: 0 },
  colTitle: { fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.08em', color: '#5a3a3a', margin: '0 0 4px', textTransform: 'uppercase' },
  link: { color: 'rgba(90,58,58,0.75)', textDecoration: 'none', fontSize: '14.5px', lineHeight: '1.3', transition: 'color 0.15s' },
};
