import React from "react";
import crochetIcon from "../assets/icons/crochetIcon.webp";
import handmadeIcon from "../assets/icons/handmadeIcon.webp";
import giftIcon from "../assets/icons/giftIcon.webp";
import secureIcon from "../assets/icons/secureIcon.webp";

const features = [
  { icon: crochetIcon,  title: "FREE SHIPPING",   subtitle: "On orders over 99" },
  { icon: handmadeIcon, title: "HANDMADE",        subtitle: "With love & care" },
  { icon: giftIcon,     title: "PERFECT GIFT",    subtitle: "For any occasion" },
  { icon: secureIcon,   title: "SECURE PAYMENT",  subtitle: "100% safe & secure" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

  .features-strip-wrapper {
    // width: 100%;
    margin:10px;
    // background: #f7f0ea;
  }

  .features-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: #fdf8f5;
    border-top: 1px solid #ede3da;
    border-radius:15px;
    // background: black;
  }

  .feature-item {
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 14px;
    padding: 20px 28px;
    border-right: 1px solid #ede3da;
  }

  .feature-item:last-child {
    border-right: none;
  }

  .feature-icon img {
    width: 42px;
    height: 42px;
    object-fit: contain;
    display: block;
  }

  .feature-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .feature-title {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: #2d2218;
    text-transform: uppercase;
    line-height: 1.2;
  }

  .feature-subtitle {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #9a8a85;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    .features-strip-wrapper {
      padding: 0 16px 20px;
    }

    .features-strip {
      grid-template-columns: 1fr 1fr;
      border-top: none;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 16px rgba(180,120,100,0.09);
    }

    .feature-item {
      padding: 16px 14px;
      border-right: 1px dotted #ede3da;
      border-bottom: 1px dotted #ede3da;
    }

    .feature-item:nth-child(even) {
      border-right: none;
    }

    .feature-item:nth-child(3),
    .feature-item:nth-child(4) {
      border-bottom: none;
    }

    .feature-title  { font-size: 11px; }
    .feature-subtitle { font-size: 10.5px; }
    .feature-icon img { width: 32px; height: 32px; }
  }
`;

const FeaturesStrip = () => (
  <>
    <style>{styles}</style>
    <div className="features-strip-wrapper">
      <div className="features-strip">
        {features.map((f, i) => (
          <div className="feature-item" key={i}>
            <div className="feature-icon">
              <img src={f.icon} alt={f.title} />
            </div>
            <div className="feature-text">
              <span className="feature-title">{f.title}</span>
              <span className="feature-subtitle">{f.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default FeaturesStrip;
