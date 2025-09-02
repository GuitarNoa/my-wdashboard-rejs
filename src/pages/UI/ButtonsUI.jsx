import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
// import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";

export default function ButtonShowcase() {
  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Button Showcase</h1>

        {/* Variants */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Primary
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              Secondary
            </button>
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50">
              Outline
            </button>
            <button className="bg-transparent text-gray-700 px-4 py-2 rounded hover:bg-gray-100">
              Ghost
            </button>
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Small
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-base">
              Medium
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded text-lg">
              Large
            </button>
          </div>
        </div>

        {/* Disabled */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disabled</h2>
          <div className="flex flex-wrap gap-4">
            <button
              disabled
              className="bg-blue-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
            >
              Primary Disabled
            </button>
            <button
              disabled
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded opacity-50 cursor-not-allowed"
            >
              Outline Disabled
            </button>
          </div>
        </div>

        {/* Buttons with Icons */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Icon Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600">
              <HeartIcon /> Like
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600">
              <ShoppingCartIcon className="h-4 w-4" /> Add to Cart
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-blue-600">
              <HeartIcon />
            </button>
          </div>
        </div>

        {/* Loading / Spinner */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Loading</h2>
          <div className="flex flex-wrap gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Loading...
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
