import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

// ─── Data ───────────────────────────────────────────────────────────────────

const INITIAL_PRODUCTS = [
  { id: 1, name: "iPhone 15", price: 20500, stock: 10 },
  { id: 2, name: "MacBook Air M3", price: 25500, stock: 0 },
  { id: 3, name: "Apple Watch Pro", price: 8900, stock: 12 },
  { id: 4, name: "MacBook Pro M4", price: 55400, stock: 6 },
  { id: 5, name: "MacBook Air M4", price: 34400, stock: 5 },
  { id: 6, name: "iPhone 16", price: 26500, stock: 25 },
  { id: 7, name: "iPhone 16 Pro", price: 34200, stock: 0 },
  { id: 8, name: "iPhone 16 Plus", price: 28000, stock: 0 },
  { id: 9, name: "iPhone 16 ProMax", price: 35400, stock: 8 },
  { id: 10, name: "iPad Air M3", price: 21400, stock: 16 },
  { id: 11, name: "iPad Pro M3", price: 35400, stock: 12 },
];

// ─── Chart plugin ────────────────────────────────────────────────────────────

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart, _args, options) => {
    if (!chart.chartArea) return;
    const {
      ctx,
      chartArea: { width, height, left, top },
    } = chart;
    ctx.save();
    ctx.font = `700 ${(height / 5).toFixed(0)}px "Inter", sans-serif`;
    ctx.fillStyle = options.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${options.total}`, left + width / 2, top + height / 2);
    ctx.restore();
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, accent, c }) {
  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* accent bar */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 3,
          background: accent,
          borderRadius: "16px 16px 0 0",
        }}
      />
      <span
        style={{
          fontSize: 13,
          color: c.textMuted,
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: c.textPrimary,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function StockBadge({ stock, isDark }) {
  if (stock > 0) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: "3px 10px",
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          background: isDark ? "rgba(34,197,94,0.15)" : "#dcfce7",
          color: isDark ? "#4ade80" : "#15803d",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#16a34a",
            display: "inline-block",
          }}
        />
        {stock} in stock
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: isDark ? "rgba(239,68,68,0.15)" : "#fee2e2",
        color: isDark ? "#f87171" : "#dc2626",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#ef4444",
          display: "inline-block",
        }}
      />
      Out of stock
    </span>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ECommerce() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // ── Color palette (light / dark) ──
  const c = {
    pageBg: isDark ? "#0b1220" : "#f8fafc",
    card: isDark ? "#1e293b" : "#fff",
    border: isDark ? "#334155" : "#e2e8f0",
    textPrimary: isDark ? "#f1f5f9" : "#0f172a",
    textSecondary: isDark ? "#cbd5e1" : "#334155",
    textMuted: isDark ? "#94a3b8" : "#64748b",
    headerBorder: isDark ? "#1e293b" : "#f1f5f9",
    rowAlt: isDark ? "#172033" : "#fafafa",
    rowHover: isDark ? "#16332a" : "#f0fdf4",
    inputBg: isDark ? "#0f172a" : "#fff",
  };

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState(null);
  const [notice, setNotice] = useState("");
  const [deleted, setDeleted] = useState(null);
  const fieldClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-gray-900";
  function saveProduct(event) {
    event.preventDefault();
    if (!draft.name.trim()) { setNotice("Enter a product name."); return; }
    const price = Number(draft.price), stock = Number(draft.stock);
    if (!Number.isFinite(price) || price < 0 || !Number.isSafeInteger(stock) || stock < 0) { setNotice("Enter a valid price and whole-number stock count."); return; }
    const product = { ...draft, name: draft.name.trim(), price, stock };
    setProducts(current => draft.id == null ? [...current, { ...product, id: Math.max(0, ...current.map(item => item.id)) + 1 }] : current.map(item => item.id === draft.id ? product : item));
    setDraft(null);
    setNotice("Product updated for this visit. Changes are not saved to a server.");
  }

  const inStockCount = products.filter((p) => p.stock > 0).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const chartData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        data: [inStockCount, outOfStockCount],
        backgroundColor: ["#4ade80", "#f87171"],
        borderColor: ["#22c55e", "#ef4444"],
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions = {
    cutout: "72%",
    plugins: {
      centerText: { total: products.length, color: c.textPrimary },
      legend: {
        position: "bottom",
        labels: {
          font: { family: "Inter, sans-serif", size: 13, weight: "500" },
          color: c.textMuted,
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed} products`,
        },
      },
    },
  };

  const handleDelete = (id) => {
    setDeleted(products.find(product => product.id === id));
    setProducts(prev => prev.filter(product => product.id !== id));
    if (draft?.id === id) setDraft(null);
    setNotice("Product removed from this demo.");
  };

  return (
    <main>
<div
        style={{
          fontFamily: "'Inter', sans-serif",

          background: c.pageBg,
          minHeight: "100vh",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: c.textPrimary,
                margin: 0,
              }}
            >
              E-Commerce
            </h1>
            <p style={{ fontSize: 14, color: c.textMuted, margin: "4px 0 0" }}>
              Product inventory overview · Sample data for this visit
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDraft({ name: "", price: "", stock: "" })}
            style={{
              background: "#0f766e",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(52,211,153,0.35)",
              fontFamily: "inherit",
            }}
          >
            + Add Product
          </button>
        </div>

        {notice && <p role="status" className="mb-4 rounded-xl bg-teal-50 p-4 text-sm text-teal-800 dark:bg-teal-950 dark:text-teal-200">{notice}{deleted && <button type="button" className="ml-2 font-semibold underline" onClick={() => { setProducts(current => [...current, deleted].sort((a,b) => a.id-b.id)); setDeleted(null); setNotice("Product restored."); }}>Undo delete</button>}</p>}
        {draft && <form onSubmit={saveProduct} className="mb-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-gray-800">
          <h2 className="font-semibold">{draft.id == null ? "Add product" : "Edit product"}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="text-sm">Product name<input autoFocus required maxLength={120} value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} className={fieldClass} /></label>
            <label className="text-sm">Price (THB)<input type="number" required min="0" max="1000000000" step="0.01" value={draft.price} onChange={event => setDraft({ ...draft, price: event.target.value })} className={fieldClass} /></label>
            <label className="text-sm">Stock<input type="number" required min="0" max="1000000000" step="1" value={draft.stock} onChange={event => setDraft({ ...draft, stock: event.target.value })} className={fieldClass} /></label>
          </div>
          <div className="flex gap-3"><button type="submit" className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">Save product</button><button type="button" onClick={() => setDraft(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm dark:border-slate-600">Cancel</button></div>
        </form>}
        {/* ── Stats + Chart ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px]"
          style={{
            gap: 20,
            marginBottom: 24,
            alignItems: "start",
          }}
        >
          {/* Stat cards (stacked) */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{
              gap: 16,
            }}
          >
            <StatCard
              label="Total Products"
              value={products.length}
              accent="linear-gradient(90deg,#34d399,#22d3ee)"
              c={c}
            />
            <StatCard
              label="In Stock"
              value={inStockCount}
              accent="#4ade80"
              c={c}
            />
            <StatCard
              label="Out of Stock"
              value={outOfStockCount}
              accent="#f87171"
              c={c}
            />
            <div style={{ gridColumn: "1/-1" }}>
              <StatCard
                label="Total Inventory Value"
                value={`฿${totalValue.toLocaleString()}`}
                accent="linear-gradient(90deg,#818cf8,#c084fc)"
                c={c}
              />
            </div>
          </div>

          {/* Doughnut chart */}
          <div
            style={{
              background: c.card,
              border: `1px solid ${c.border}`,
              borderRadius: 16,
              padding: "20px 16px",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: c.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: "0 0 12px",
              }}
            >
              Stock ratio
            </p>
            <Doughnut
              data={chartData}
              options={chartOptions}
              plugins={[centerTextPlugin]}
              aria-label={`Stock ratio: ${inStockCount} in stock, ${outOfStockCount} out of stock`}
            />
          </div>
        </div>

        {/* ── Table card ── */}
        <div
          style={{
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Table header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 20px",
              flexWrap: "wrap",
              gap: 12,
              borderBottom: `1px solid ${c.headerBorder}`,
            }}
          >
            <span
              style={{ fontWeight: 600, fontSize: 15, color: c.textPrimary }}
            >
              Products
            </span>
            <input
              aria-label="Search products"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product…"
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 8,
                padding: "7px 14px",
                fontSize: 13,
                color: c.textPrimary,
                background: c.inputBg,
                outline: "none",
                fontFamily: "inherit",
                width: 200,
              }}
            />
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: c.rowAlt }}>
                  {[
                    "ID",
                    "Product Name",
                    "Price (THB)",
                    "Stock",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "11px 20px",
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: 12,
                        color: c.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => (
                  <tr
                    key={product.id}
                    style={{
                      borderTop: `1px solid ${c.headerBorder}`,
                      background: i % 2 === 0 ? c.card : c.rowAlt,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = c.rowHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        i % 2 === 0 ? c.card : c.rowAlt)
                    }
                  >
                    <td
                      style={{
                        padding: "12px 20px",
                        color: c.textMuted,
                        fontWeight: 500,
                      }}
                    >
                      #{product.id}
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        color: c.textPrimary,
                        fontWeight: 500,
                      }}
                    >
                      {product.name}
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        color: c.textSecondary,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      ฿{product.price.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <StockBadge stock={product.stock} isDark={isDark} />
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          type="button"
                          onClick={() => setDraft({ ...product })}
                          aria-label={"Edit " + product.name}
                          style={{
                            padding: "5px 14px",
                            borderRadius: 7,
                            border: `1px solid ${c.border}`,
                            background: c.inputBg,
                            color: c.textSecondary,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          aria-label={"Delete " + product.name}
                          onClick={() => handleDelete(product.id)}
                          style={{
                            padding: "5px 14px",
                            borderRadius: 7,
                            border: `1px solid ${
                              isDark ? "#7f1d1d" : "#fee2e2"
                            }`,
                            background: isDark ? "#2a1212" : "#fff5f5",
                            color: isDark ? "#f87171" : "#dc2626",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: "40px 20px",
                        textAlign: "center",
                        color: c.textMuted,
                      }}
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer row */}
          <div
            style={{
              padding: "12px 20px",
              borderTop: `1px solid ${c.headerBorder}`,
              fontSize: 13,
              color: c.textMuted,
            }}
          >
            Showing {filtered.length} of {products.length} products
          </div>
        </div>
      </div>
  </main>
  );
}
