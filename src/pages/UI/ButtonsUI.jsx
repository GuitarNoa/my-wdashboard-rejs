// ButtonShowcase.jsx
import DefaultLayout from "../../layouts/DefaultLayout";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";

// Spinner แยกออกมาใช้ซ้ำได้
function Spinner({ className = "h-4 w-4" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );
}

// Section wrapper ลด markup ซ้ำ
function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
        {title}
      </h2>
      <div className="flex flex-wrap gap-3 items-center">{children}</div>
    </section>
  );
}

export default function ButtonShowcase() {
  return (
    <DefaultLayout>
      <div className="p-6 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">
            Button Showcase
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            All button variants, sizes, and states
          </p>
        </div>

        {/* Variants */}
        <Section title="Variants">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Primary
          </button>
          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Secondary
          </button>
          <button
            type="button"
            className="border border-blue-500 text-blue-500 hover:bg-blue-50 text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Outline
          </button>
          <button
            type="button"
            className="text-gray-600 hover:bg-gray-100 text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Ghost
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Danger
          </button>
        </Section>

        {/* Sizes */}
        <Section title="Sizes">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-md transition"
          >
            Small
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Medium
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white text-base font-medium px-5 py-2.5 rounded-lg transition"
          >
            Large
          </button>
        </Section>

        {/* Icon Buttons */}
        <Section title="Icon Buttons">
          <button
            type="button"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            <HeartIcon className="h-4 w-4" aria-hidden="true" />
            Like
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            <ShoppingCartIcon className="h-4 w-4" aria-hidden="true" />
            Add to Cart
          </button>
          {/* Icon-only — ต้องมี aria-label */}
          <button
            type="button"
            aria-label="Like"
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full transition"
          >
            <HeartIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </Section>

        {/* Disabled */}
        <Section title="Disabled">
          <button
            type="button"
            disabled
            className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg opacity-40 cursor-not-allowed"
          >
            Primary
          </button>
          <button
            type="button"
            disabled
            className="border border-blue-500 text-blue-500 text-sm font-medium px-4 py-2 rounded-lg opacity-40 cursor-not-allowed"
          >
            Outline
          </button>
          <button
            type="button"
            disabled
            className="bg-gray-100 text-gray-500 text-sm font-medium px-4 py-2 rounded-lg opacity-40 cursor-not-allowed"
          >
            Secondary
          </button>
        </Section>

        {/* Loading */}
        <Section title="Loading">
          <button
            type="button"
            disabled
            className="flex items-center gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg opacity-75 cursor-not-allowed"
          >
            <Spinner />
            Loading...
          </button>
          <button
            type="button"
            disabled
            className="flex items-center gap-2 border border-blue-500 text-blue-500 text-sm font-medium px-4 py-2 rounded-lg opacity-75 cursor-not-allowed"
          >
            <Spinner className="h-4 w-4 text-blue-500" />
            Saving...
          </button>
        </Section>
      </div>
    </DefaultLayout>
  );
}
