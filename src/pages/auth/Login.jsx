import React from "react";

export default function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-t from-green-400 to-cyan-400">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white p-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-cyan-500 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}
