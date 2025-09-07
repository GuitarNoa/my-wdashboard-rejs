import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ลงทะเบียน Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ECommerce() {
  const [products, setProducts] = useState([
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
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const inStockCount = products.filter((p) => p.stock > 0).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  // ข้อมูลสำหรับ Doughnut Chart
  const baseData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        label: "Stock Status",
        data: [inStockCount, outOfStockCount],
        backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">E-Commerce Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Product
          </button>
        </div>

        {/* Doughnut Chart */}
        <div className="mb-8 max-w-sm mx-auto">
          <Doughnut data={baseData} />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold">In Stock</h2>
            <p className="text-2xl font-bold">{inStockCount}</p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold">Out of Stock</h2>
            <p className="text-2xl font-bold">{outOfStockCount}</p>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Product Name</th>
                <th className="py-2 px-4 text-left">Price (THB)</th>
                <th className="py-2 px-4 text-left">Stock</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{product.id}</td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">
                    {product.price.toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    {product.stock > 0 ? (
                      <span className="px-2 py-1 bg-green-500 text-white rounded-full">
                        {product.stock} In Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-500 text-white rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}
