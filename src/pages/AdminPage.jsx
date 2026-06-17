import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useCategories } from "../hooks/useCategories";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection, onSnapshot, doc,
  addDoc, updateDoc, deleteDoc, setDoc
} from "firebase/firestore";
const CLOUDINARY_CLOUD = "dvx0lfjiz";
const CLOUDINARY_PRESET = "crochetly_products";

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  if (!data.secure_url) throw new Error("Upload failed");
  return data.secure_url;
}



/* ── Styles ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

  .adm-root {
    min-height: 100vh;
    background: #faf8f6;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
  }

  /* Login */
  .adm-login {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
  .adm-login-box {
    background: white;
    border: 1px solid #e8e2da;
    border-radius: 12px;
    padding: 40px;
    width: 100%;
    max-width: 380px;
  }
  .adm-login-logo {
    font-size: 1.6rem;
    font-weight: 600;
    color: #c05080;
    margin-bottom: 6px;
  }
  .adm-login-sub {
    font-size: 0.8rem;
    color: #9a8f82;
    margin-bottom: 28px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* Form elements */
  .adm-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #7a7060;
    margin-bottom: 6px;
  }
  .adm-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e8e2da;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    margin-bottom: 16px;
    background: #faf8f6;
    color: #1a1a1a;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .adm-input:focus {
    outline: none;
    border-color: #c05080;
  }
  .adm-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e8e2da;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    margin-bottom: 16px;
    background: #faf8f6;
    color: #1a1a1a;
    box-sizing: border-box;
  }
  .adm-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e8e2da;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    margin-bottom: 16px;
    background: #faf8f6;
    color: #1a1a1a;
    resize: vertical;
    min-height: 80px;
    box-sizing: border-box;
  }

  /* Buttons */
  .adm-btn-primary {
    width: 100%;
    padding: 11px;
    background: #c05080;
    color: white;
    border: none;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .adm-btn-primary:hover { background: #a03060; }
  .adm-btn-primary:disabled { background: #d4a0b0; cursor: not-allowed; }

  .adm-btn-sm {
    padding: 6px 14px;
    border: none;
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    white-space: nowrap;
  }
  .adm-btn-edit { background: #f0ebe2; color: #1a1a1a; }
  .adm-btn-edit:hover { background: #e8e0d4; }
  .adm-btn-delete { background: #fce8e8; color: #c03030; }
  .adm-btn-delete:hover { background: #f8d0d0; }
  .adm-btn-outline {
    padding: 9px 20px;
    background: white;
    border: 1px solid #e8e2da;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    color: #1a1a1a;
    transition: background 0.2s;
  }
  .adm-btn-outline:hover { background: #f0ebe2; }

  /* Topbar */
  .adm-topbar {
    background: white;
    border-bottom: 1px solid #e8e2da;
    padding: 0 24px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    gap: 12px;
  }
  .adm-topbar-logo {
    font-size: 1.1rem;
    font-weight: 600;
    color: #c05080;
    white-space: nowrap;
  }
  .adm-topbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.82rem;
    color: #7a7060;
  }
  .adm-topbar-email {
    display: none;
  }
  @media (min-width: 500px) {
    .adm-topbar-email { display: inline; }
  }

  /* Main content */
  .adm-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px 16px;
  }
  @media (min-width: 640px) {
    .adm-content { padding: 32px 24px; }
  }
  .adm-page-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .adm-page-sub {
    font-size: 0.82rem;
    color: #9a8f82;
    margin-bottom: 24px;
  }

  /* Stats row */
  .adm-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  @media (min-width: 640px) {
    .adm-stats {
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
  }
  .adm-stat-card {
    background: white;
    border: 1px solid #e8e2da;
    border-radius: 10px;
    padding: 14px 16px;
  }
  @media (min-width: 640px) {
    .adm-stat-card { padding: 18px 20px; }
  }
  .adm-stat-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9a8f82;
    margin-bottom: 4px;
  }
  .adm-stat-value {
    font-size: 1.6rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  /* Toolbar */
  .adm-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    gap: 10px;
    flex-wrap: wrap;
  }
  .adm-search {
    padding: 8px 12px;
    border: 1px solid #e8e2da;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    background: white;
    color: #1a1a1a;
    flex: 1;
    min-width: 0;
    max-width: 280px;
  }
  .adm-search:focus { outline: none; border-color: #c05080; }

  /* ── DESKTOP TABLE ── */
  .adm-table-wrap {
    background: white;
    border: 1px solid #e8e2da;
    border-radius: 10px;
    overflow: hidden;
    display: none;
  }
  @media (min-width: 700px) {
    .adm-table-wrap { display: block; }
  }
  .adm-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  .adm-table th {
    background: #faf8f6;
    padding: 12px 16px;
    text-align: left;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #7a7060;
    border-bottom: 1px solid #e8e2da;
  }
  .adm-table td {
    padding: 14px 16px;
    border-bottom: 1px solid #f0ebe2;
    vertical-align: middle;
  }
  .adm-table tr:last-child td { border-bottom: none; }
  .adm-table tr:hover td { background: #faf8f6; }

  /* ── MOBILE CARDS ── */
  .adm-cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  @media (min-width: 700px) {
    .adm-cards { display: none; }
  }
  .adm-card {
    background: white;
    border: 1px solid #e8e2da;
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .adm-card-top {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .adm-card-info {
    flex: 1;
    min-width: 0;
  }
  .adm-card-name {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .adm-card-material {
    font-size: 0.75rem;
    color: #9a8f82;
    margin-bottom: 6px;
  }
  .adm-card-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .adm-card-price {
    font-weight: 600;
    font-size: 0.88rem;
    color: #1a1a1a;
  }
  .adm-card-old-price {
    font-size: 0.75rem;
    color: #9a8f82;
    text-decoration: line-through;
  }
  .adm-card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f0ebe2;
    padding-top: 10px;
    gap: 8px;
  }
  .adm-card-toggle-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.78rem;
    color: #7a7060;
  }

  .adm-product-img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e8e2da;
    flex-shrink: 0;
  }
  .adm-product-img-placeholder {
    width: 48px;
    height: 48px;
    background: #f0ebe2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .adm-badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .adm-badge-cat {
    background: #f0ebe2;
    color: #7a7060;
  }
  .adm-badge-badge {
    background: #fce8f0;
    color: #c05080;
  }

  /* Toggle */
  .adm-toggle {
    position: relative;
    width: 36px;
    height: 20px;
    cursor: pointer;
    flex-shrink: 0;
  }
  .adm-toggle input { opacity: 0; width: 0; height: 0; }
  .adm-toggle-track {
    position: absolute;
    inset: 0;
    background: #ddd;
    border-radius: 20px;
    transition: background 0.2s;
  }
  .adm-toggle input:checked + .adm-toggle-track { background: #c05080; }
  .adm-toggle-thumb {
    position: absolute;
    top: 2px; left: 2px;
    width: 16px; height: 16px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }
  .adm-toggle input:checked ~ .adm-toggle-thumb { transform: translateX(16px); }

  /* Action buttons row */
  .adm-actions { display: flex; gap: 6px; }

  /* Modal overlay */
  .adm-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 200;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0;
  }
  @media (min-width: 600px) {
    .adm-modal-overlay {
      align-items: center;
      padding: 24px;
    }
  }
  .adm-modal {
    background: white;
    border-radius: 16px 16px 0 0;
    padding: 24px 20px;
    width: 100%;
    max-height: 92vh;
    overflow-y: auto;
  }
  @media (min-width: 600px) {
    .adm-modal {
      border-radius: 12px;
      padding: 32px;
      max-width: 520px;
      max-height: 90vh;
    }
  }
  .adm-modal-handle {
    width: 40px;
    height: 4px;
    background: #e8e2da;
    border-radius: 2px;
    margin: 0 auto 20px;
  }
  @media (min-width: 600px) {
    .adm-modal-handle { display: none; }
  }
  .adm-modal-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .adm-modal-footer {
    display: flex;
    gap: 10px;
    margin-top: 8px;
  }
  .adm-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  /* Error */
  .adm-error {
    background: #fce8e8;
    color: #c03030;
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 0.82rem;
    margin-bottom: 16px;
  }

  /* Empty */
  .adm-empty {
    text-align: center;
    padding: 48px;
    color: #9a8f82;
    font-size: 0.9rem;
  }
  .adm-empty-cards {
    text-align: center;
    padding: 40px 20px;
    color: #9a8f82;
    font-size: 0.88rem;
    background: white;
    border: 1px solid #e8e2da;
    border-radius: 10px;
  }
`;

/* ── Categories ── */
const CATEGORIES = [
  { key: "keychains", label: "Keychains" },
  { key: "plushies",  label: "Plushies" },
  { key: "dolls",     label: "Dolls" },
  { key: "figurines", label: "Figurines" },
  { key: "hampers",   label: "Hampers" },
];

const BADGES = ["BEST SELLER", "FAN FAVE", "NEW", "SPORTS", "WINTER FAVORITE", "LIMITED", "SALE"];

const EMPTY_FORM = {
  name: "", category: "keychains", product: "",
  price: "", oldPrice: "", badge: "", imageName: "", desc: "",
};

/* ── Login Screen ── */
function LoginScreen({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return setError("Please fill in both fields.");
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-login">
      <div className="adm-login-box">
        <div className="adm-login-logo">Crochet Loops</div>
        <div className="adm-login-sub">Admin Panel</div>
        {error && <div className="adm-error">{error}</div>}
        <label className="adm-label">Email</label>
        <input
          className="adm-input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="example@gmail.com"
        />
        <label className="adm-label">Password</label>
        <input
          className="adm-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="••••••••"
        />
        <button className="adm-btn-primary" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

/* ── Product Form Modal ── */
function ProductModal({ product, onClose, onSave }) {
  const { categories } = useCategories();          // ← add this
  const [form, setForm] = useState(product || { ...EMPTY_FORM, category: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.imageUrl || "");
  const [loading, setLoading]     = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");

  // Set default category once categories load (for new products)
  useEffect(() => {
    if (!product && categories.length > 0 && !form.category) {
      setForm(f => ({ ...f, category: categories[0].key }));
    }
  }, [categories]);

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.desc)
      return setError("Name, price and description are required.");
    if (!imagePreview)
      return setError("Please upload a product image.");

    setLoading(true);
    setError("");

    try {
      let imageUrl = form.imageUrl || "";

      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadToCloudinary(imageFile);
        setUploading(false);
      }

      const slug = form.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const data = {
        ...form,
        imageUrl,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        slug,
        visible: form.visible ?? true,
        updatedAt: new Date(),
      };

      await onSave(data, slug);
      onClose();
    } catch (e) {
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-handle" />
        <div className="adm-modal-title">
          {product ? "Edit Product" : "Add New Product"}
        </div>

        {error && <div className="adm-error">{error}</div>}

        <label className="adm-label">Product Name</label>
        <input className="adm-input" value={form.name}
          onChange={e => set("name", e.target.value)}
          placeholder="TURTLE PLUSHIE" />

        <label className="adm-label">Category</label>
        <select className="adm-select" value={form.category}
      onChange={e => set("category", e.target.value)}>
      {categories.map(c => (
        <option key={c.key} value={c.key}>{c.label}</option>
      ))}
    </select>

        <label className="adm-label">Yarn / Material</label>
        <input className="adm-input" value={form.product}
          onChange={e => set("product", e.target.value)}
          placeholder="Soft Acrylic Yarn" />

        <div className="adm-form-row">
          <div>
            <label className="adm-label">Price (₹)</label>
            <input className="adm-input" type="number" value={form.price}
              onChange={e => set("price", e.target.value)}
              placeholder="99" />
          </div>
          <div>
            <label className="adm-label">Old Price (₹)</label>
            <input className="adm-input" type="number" value={form.oldPrice || ""}
              onChange={e => set("oldPrice", e.target.value)}
              placeholder="299" />
          </div>
        </div>

        <label className="adm-label">Badge — optional</label>
        <select className="adm-select" value={form.badge}
          onChange={e => set("badge", e.target.value)}>
          <option value="">No badge</option>
          {BADGES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <label className="adm-label">Product Image</label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            style={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 12,
              border: "1px solid #e8e2da",
            }}
          />
        )}
        <label style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "12px",
          border: "2px dashed #e8e2da",
          borderRadius: 8,
          cursor: "pointer",
          marginBottom: 16,
          fontSize: "0.85rem",
          color: "#7a7060",
          transition: "border-color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#c05080"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e2da"}
        >
          <span style={{ fontSize: "1.4rem" }}>📷</span>
          <span>{imageFile ? imageFile.name : "Click to choose image"}</span>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>

        <label className="adm-label">Description</label>
        <textarea className="adm-textarea" value={form.desc}
          onChange={e => set("desc", e.target.value)}
          placeholder="A short description of the product..." />

        <div className="adm-modal-footer">
          <button
            className="adm-btn-primary"
            onClick={handleSave}
            disabled={loading || uploading}
            style={{ flex: 1 }}
          >
            {uploading ? "Uploading image..." : loading ? "Saving..." : "Save Product"}
          </button>
          <button className="adm-btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function CategoriesPanel({ products }) {
  const { categories } = useCategories();
  const [form, setForm]       = useState({ name: "", accent: "#c05080" });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handleAdd = async () => {
    if (!form.name) return setError("Please enter a category name.");
    setError("");
    const key           = form.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const label         = form.name.toUpperCase().trim();
    const raw           = form.name.trim();
    const singular      = raw.endsWith("s") ? raw.slice(0, -1) : raw;
    const singularLabel = singular.charAt(0).toUpperCase() + singular.slice(1).toLowerCase();
    try {
      await setDoc(doc(db, "categories", key), {
        key, label, singularLabel,
        accent: form.accent,
        order: categories.length + 1,
      });
      setForm({ name: "", accent: "#c05080" });
      setSuccess("Category added!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (e) {
      setError("Failed to add category.");
    }
  };

  const handleDelete = async (firestoreId, categoryKey) => {
    const affected = products.filter(p => p.category === categoryKey).length;
    const confirmMsg = affected > 0
      ? `⚠️ ${affected} product(s) use this category. They will become uncategorised on the storefront. Delete anyway?`
      : "Delete this category?";
    if (!window.confirm(confirmMsg)) return;
    await deleteDoc(doc(db, "categories", firestoreId));
  };

  const handleAccentChange = async (firestoreId, accent) => {
    await updateDoc(doc(db, "categories", firestoreId), { accent });
  };

  return (
    <div>
      <div className="adm-page-title">Categories</div>
      <div className="adm-page-sub">Manage shop categories — changes reflect live on storefront</div>

      {/* Add form */}
      <div style={{ background: "white", border: "1px solid #e8e2da", borderRadius: 10, padding: 24, marginBottom: 24 }}>
        <div style={{ fontWeight: 600, marginBottom: 16, fontSize: "0.9rem" }}>Add New Category</div>
        {error   && <div className="adm-error">{error}</div>}
        {success && <div style={{ background: "#e8f5e9", color: "#2e7d32", padding: "10px 14px", borderRadius: 6, fontSize: "0.82rem", marginBottom: 16 }}>{success}</div>}

        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <label className="adm-label">Category Name</label>
            <input
              className="adm-input"
              style={{ marginBottom: 0 }}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Plushies"
            />
          </div>
          <div>
            <label className="adm-label">Accent Color</label>
            <input
              type="color"
              value={form.accent}
              onChange={e => setForm(f => ({ ...f, accent: e.target.value }))}
              style={{ width: 44, height: 42, border: "1px solid #e8e2da", borderRadius: 6, cursor: "pointer", padding: 2, display: "block" }}
            />
          </div>
          <button
            className="adm-btn-primary"
            style={{ width: "auto", padding: "9px 24px", marginBottom: 1 }}
            onClick={handleAdd}
          >
            + Add
          </button>
        </div>
      </div>

      {/* ── DESKTOP TABLE ── */}
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Accent</th>
              <th>Products</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr><td colSpan={4}><div className="adm-empty">No categories yet.</div></td></tr>
            ) : categories.map(cat => {
              const productCount = products.filter(p => p.category === cat.key).length;
              return (
                <tr key={cat.firestoreId}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{cat.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "#9a8f82", marginTop: 2 }}>
                      <code style={{ background: "#f0ebe2", padding: "1px 5px", borderRadius: 3 }}>{cat.key}</code>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="color"
                        value={cat.accent || "#c05080"}
                        onChange={e => handleAccentChange(cat.firestoreId, e.target.value)}
                        style={{ width: 32, height: 32, border: "1px solid #e8e2da", borderRadius: 4, cursor: "pointer", padding: 2 }}
                      />
                      <span style={{ fontSize: "0.78rem", color: "#7a7060" }}>{cat.accent}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      background: productCount > 0 ? "#fdf0f4" : "#f5f5f5",
                      color: productCount > 0 ? "#c05080" : "#aaa",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}>
                      {productCount} {productCount === 1 ? "product" : "products"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="adm-btn-sm adm-btn-delete"
                      onClick={() => handleDelete(cat.firestoreId, cat.key)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE CARDS ── */}
      <div className="adm-cards">
        {categories.length === 0 ? (
          <div className="adm-empty-cards">No categories yet.</div>
        ) : categories.map(cat => {
          const productCount = products.filter(p => p.category === cat.key).length;
          return (
            <div className="adm-card" key={cat.firestoreId}>
              <div className="adm-card-top">

                {/* Color swatch instead of image */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: cat.accent || "#c05080",
                  flexShrink: 0,
                }} />

                <div className="adm-card-info">
                  <div className="adm-card-name">{cat.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "#9a8f82", marginTop: 2 }}>
                    <code style={{ background: "#f0ebe2", padding: "1px 5px", borderRadius: 3 }}>{cat.key}</code>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      background: productCount > 0 ? "#fdf0f4" : "#f5f5f5",
                      color: productCount > 0 ? "#c05080" : "#aaa",
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}>
                      {productCount} {productCount === 1 ? "product" : "products"}
                    </span>
                  </div>
                </div>

                {/* Accent color picker on the right */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
                  <input
                    type="color"
                    value={cat.accent || "#c05080"}
                    onChange={e => handleAccentChange(cat.firestoreId, e.target.value)}
                    style={{ width: 32, height: 32, border: "1px solid #e8e2da", borderRadius: 4, cursor: "pointer", padding: 2 }}
                  />
                  <span style={{ fontSize: "0.65rem", color: "#9a8f82" }}>{cat.accent}</span>
                </div>

              </div>

              <div className="adm-card-bottom">
                <div /> {/* spacer */}
                <div className="adm-actions">
                  <button
                    className="adm-btn-sm adm-btn-delete"
                    onClick={() => handleDelete(cat.firestoreId, cat.key)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
/* ── Main Admin Page ── */
export default function AdminPage() {
  const [user, setUser]           = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts]   = useState([]);
  const [search, setSearch]       = useState("");
  const [modalProduct, setModalProduct] = useState(undefined);
  const [deleteId, setDeleteId]   = useState(null);
  const [tab, setTab] = useState("products"); // "products" | "categories"

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(collection(db, "products"), snap => {
      const docs = snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
      docs.sort((a, b) => (a.id || 0) - (b.id || 0));
      setProducts(docs);
    });
    return unsub;
  }, [user]);

  const handleSave = async (data, slug) => {
    const id = modalProduct?.firestoreId || slug;
    await setDoc(doc(db, "products", id), data, { merge: true });
  };

  const handleToggleVisible = async (product) => {
    await updateDoc(doc(db, "products", product.firestoreId), {
      visible: !(product.visible ?? true),
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteDoc(doc(db, "products", deleteId));
    setDeleteId(null);
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: products.length,
    visible: products.filter(p => p.visible !== false).length,
    onSale: products.filter(p => p.oldPrice).length,
    categories: [...new Set(products.map(p => p.category))].length,
  };

  if (authLoading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  if (!user) return (
    <>
      <style>{css}</style>
      <div className="adm-root"><LoginScreen /></div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="adm-root">

        {/* Topbar */}
        <div className="adm-topbar">
          <div className="adm-topbar-logo">Crochet Loops Admin</div>
          <div className="adm-topbar-right">
            <span className="adm-topbar-email">{user.email}</span>
            <button className="adm-btn-outline" style={{ padding: "6px 14px" }}
              onClick={() => signOut(auth)}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="adm-content">

           <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
    {["products", "categories"].map(t => (
      <button
        key={t}
        onClick={() => setTab(t)}
        style={{
          padding: "8px 20px",
          border: "1px solid #e8e2da",
          borderRadius: 6,
          background: tab === t ? "#c05080" : "white",
          color: tab === t ? "white" : "#1a1a1a",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          cursor: "pointer",
          textTransform: "capitalize",
        }}
      >
        {t}
      </button>
    ))}
  </div>

  {tab === "products" && (
    <>
      <div className="adm-page-title">Products</div>
      <div className="adm-page-sub">Manage your product catalogue</div>

          {/* Stats */}
          <div className="adm-stats">
            <div className="adm-stat-card">
              <div className="adm-stat-label">Total</div>
              <div className="adm-stat-value">{stats.total}</div>
            </div>
            <div className="adm-stat-card">
              <div className="adm-stat-label">Visible</div>
              <div className="adm-stat-value">{stats.visible}</div>
            </div>
            <div className="adm-stat-card">
              <div className="adm-stat-label">On Sale</div>
              <div className="adm-stat-value">{stats.onSale}</div>
            </div>
            <div className="adm-stat-card">
              <div className="adm-stat-label">Categories</div>
              <div className="adm-stat-value">{stats.categories}</div>
            </div>
          </div>

          

          {/* Toolbar */}
          <div className="adm-toolbar">
            <input
              className="adm-search"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="adm-btn-primary"
              style={{ width: "auto", padding: "9px 18px", flexShrink: 0 }}
              onClick={() => setModalProduct(null)}>
              + Add Product
            </button>
          </div>

          {/* ── DESKTOP TABLE ── */}
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Badge</th>
                  <th>Visible</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6}>
                    <div className="adm-empty">No products found.</div>
                  </td></tr>
                ) : filtered.map(p => (
                  <tr key={p.firestoreId}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {p.imageUrl
                          ? <img className="adm-product-img" src={p.imageUrl} alt={p.name} />
                          : <div className="adm-product-img-placeholder">🧶</div>
                        }
                        <div>
                          <div style={{ fontWeight: 500, fontSize: "0.88rem" }}>{p.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "#9a8f82" }}>{p.product}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="adm-badge adm-badge-cat">{p.category}</span></td>
                    <td>
                      <div style={{ fontWeight: 500 }}>₹{p.price}</div>
                      {p.oldPrice && (
                        <div style={{ fontSize: "0.75rem", color: "#9a8f82", textDecoration: "line-through" }}>
                          ₹{p.oldPrice}
                        </div>
                      )}
                    </td>
                    <td>
                      {p.badge
                        ? <span className="adm-badge adm-badge-badge">{p.badge}</span>
                        : <span style={{ color: "#ccc" }}>—</span>
                      }
                    </td>
                    <td>
                      <label className="adm-toggle">
                        <input
                          type="checkbox"
                          checked={p.visible !== false}
                          onChange={() => handleToggleVisible(p)}
                        />
                        <div className="adm-toggle-track" />
                        <div className="adm-toggle-thumb" />
                      </label>
                    </td>
                    <td>
                      <div className="adm-actions">
                        <button className="adm-btn-sm adm-btn-edit"
                          onClick={() => setModalProduct(p)}>Edit</button>
                        <button className="adm-btn-sm adm-btn-delete"
                          onClick={() => setDeleteId(p.firestoreId)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── MOBILE CARDS ── */}
          <div className="adm-cards">
            {filtered.length === 0 ? (
              <div className="adm-empty-cards">No products found.</div>
            ) : filtered.map(p => (
              <div className="adm-card" key={p.firestoreId}>
                <div className="adm-card-top">
                  {p.imageUrl
                    ? <img className="adm-product-img" src={p.imageUrl} alt={p.name} />
                    : <div className="adm-product-img-placeholder">🧶</div>
                  }
                  <div className="adm-card-info">
                    <div className="adm-card-name">{p.name}</div>
                    <div className="adm-card-material">{p.product}</div>
                    <div className="adm-card-meta">
                      <span className="adm-badge adm-badge-cat">{p.category}</span>
                      {p.badge && <span className="adm-badge adm-badge-badge">{p.badge}</span>}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="adm-card-price">₹{p.price}</div>
                    {p.oldPrice && (
                      <div className="adm-card-old-price">₹{p.oldPrice}</div>
                    )}
                  </div>
                </div>
                <div className="adm-card-bottom">
                  <div className="adm-card-toggle-row">
                    <label className="adm-toggle">
                      <input
                        type="checkbox"
                        checked={p.visible !== false}
                        onChange={() => handleToggleVisible(p)}
                      />
                      <div className="adm-toggle-track" />
                      <div className="adm-toggle-thumb" />
                    </label>
                    <span>{p.visible !== false ? "Visible" : "Hidden"}</span>
                  </div>
                  <div className="adm-actions">
                    <button className="adm-btn-sm adm-btn-edit"
                      onClick={() => setModalProduct(p)}>Edit</button>
                    <button className="adm-btn-sm adm-btn-delete"
                      onClick={() => setDeleteId(p.firestoreId)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </>
  )}

  {tab === "categories" && <CategoriesPanel products={products} />}
        </div>

        {/* Add/Edit Modal */}
        {modalProduct !== undefined && (
          <ProductModal
            product={modalProduct}
            onClose={() => setModalProduct(undefined)}
            onSave={handleSave}
          />
        )}

        {/* Delete Confirm Modal */}
        {deleteId && (
          <div className="adm-modal-overlay" onClick={() => setDeleteId(null)}>
            <div className="adm-modal" style={{ maxWidth: 360 }} onClick={e => e.stopPropagation()}>
              <div className="adm-modal-handle" />
              <div className="adm-modal-title">Delete Product?</div>
              <p style={{ fontSize: "0.88rem", color: "#7a7060", marginBottom: 24 }}>
                This will permanently remove the product from Firestore. This cannot be undone.
              </p>
              <div className="adm-modal-footer">
                <button className="adm-btn-primary"
                  style={{ background: "#c03030", flex: 1 }}
                  onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button className="adm-btn-outline" onClick={() => setDeleteId(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}


