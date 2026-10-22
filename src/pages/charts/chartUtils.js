import { useSyncExternalStore } from "react";

// Recompute after Chart.js layout changes, including sidebar resizing.
export function chartGradient(create, fallback) {
  const cache = new WeakMap();
  return ({ chart }) => {
    const area = chart.chartArea;
    if (!area) return fallback;
    const bounds = [area.left, area.top, area.right, area.bottom].join(":");
    const previous = cache.get(chart);
    if (previous?.bounds === bounds) return previous.color;
    const color = create(chart.ctx, area);
    cache.set(chart, { bounds, color });
    return color;
  };
}

function subscribe(callback) {
  const query = window.matchMedia("(max-width: 639px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function useCompactChartLegend() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(max-width: 639px)").matches,
    () => false,
  );
}
