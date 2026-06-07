import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

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

const makeCenterTextPlugin = (total) => ({
  id: "centerText",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { width, height, left, top },
    } = chart;
    ctx.save();
    ctx.font = `700 ${(height / 5).toFixed(0)}px "DM Sans", sans-serif`;
    ctx.fillStyle = "#0f172a";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${total}`, left + width / 2, top + height / 2);
    ctx.restore();
  },
});

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, accent }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
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
          color: "#94a3b8",
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
          color: "#0f172a",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function StockBadge({ stock }) {
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
          background: "#dcfce7",
          color: "#15803d",
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
        background: "#fee2e2",
        color: "#dc2626",
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
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");

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
      legend: {
        position: "bottom",
        labels: {
          font: { family: "DM Sans, sans-serif", size: 13, weight: "500" },
          color: "#64748b",
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

  const handleDelete = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <DefaultLayout>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          padding: "28px 32px",
          background: "#f8fafc",
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
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              E-Commerce
            </h1>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>
              Product inventory overview
            </p>
          </div>
          <button
            style={{
              background: "linear-gradient(135deg, #34d399, #22d3ee)",
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

        {/* ── Stats + Chart ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 220px",
            gap: 20,
            marginBottom: 24,
            alignItems: "start",
          }}
        >
          {/* Stat cards (stacked) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            <StatCard
              label="Total Products"
              value={products.length}
              accent="linear-gradient(90deg,#34d399,#22d3ee)"
            />
            <StatCard label="In Stock" value={inStockCount} accent="#4ade80" />
            <StatCard
              label="Out of Stock"
              value={outOfStockCount}
              accent="#f87171"
            />
            <div style={{ gridColumn: "1/-1" }}>
              <StatCard
                label="Total Inventory Value"
                value={`฿${totalValue.toLocaleString()}`}
                accent="linear-gradient(90deg,#818cf8,#c084fc)"
              />
            </div>
          </div>

          {/* Doughnut chart */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: "20px 16px",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#94a3b8",
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
              plugins={[makeCenterTextPlugin(products.length)]}
            />
          </div>
        </div>

        {/* ── Table card ── */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
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
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>
              Products
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product…"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: "7px 14px",
                fontSize: 13,
                color: "#0f172a",
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
                <tr style={{ background: "#f8fafc" }}>
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
                        color: "#94a3b8",
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
                      borderTop: "1px solid #f1f5f9",
                      background: i % 2 === 0 ? "#fff" : "#fafafa",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f0fdf4")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        i % 2 === 0 ? "#fff" : "#fafafa")
                    }
                  >
                    <td
                      style={{
                        padding: "12px 20px",
                        color: "#94a3b8",
                        fontWeight: 500,
                      }}
                    >
                      #{product.id}
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        color: "#0f172a",
                        fontWeight: 500,
                      }}
                    >
                      {product.name}
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        color: "#334155",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      ฿{product.price.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <StockBadge stock={product.stock} />
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          style={{
                            padding: "5px 14px",
                            borderRadius: 7,
                            border: "1px solid #e2e8f0",
                            background: "#fff",
                            color: "#334155",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          style={{
                            padding: "5px 14px",
                            borderRadius: 7,
                            border: "1px solid #fee2e2",
                            background: "#fff5f5",
                            color: "#dc2626",
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
                        color: "#94a3b8",
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
              borderTop: "1px solid #f1f5f9",
              fontSize: 13,
              color: "#94a3b8",
            }}
          >
            Showing {filtered.length} of {products.length} products
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
