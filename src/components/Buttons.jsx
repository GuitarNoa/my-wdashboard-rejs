import React from "react";

export default function Buttons() {
  return (
    <>
      <div className="p-2 flex flex-wrap gap-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Primary
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Secondary
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Success
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Warning
        </button>
        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
          Info
        </button>
        <button className="bg-gray-100 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded">
          Light
        </button>
        <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Dark
        </button>
        <button className="bg-gray-200 hover:bg-blue-700 text-blue-600 font-bold py-2 px-4 rounded">
          Link
        </button>
      </div>
      {/* <div className="p-2 flex flex-wrap gap-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Primary
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Secondary
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Success
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Warning
        </button>
        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
          Info
        </button>
        <button className="bg-gray-100 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded">
          Light
        </button>
        <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Dark
        </button>
        <button className="bg-gray-200 hover:bg-blue-700 text-blue-600 font-bold py-2 px-4 rounded">
          Link
        </button>
      </div> */}
    </>
  );
}
