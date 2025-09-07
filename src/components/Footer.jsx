// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-green-400 to-cyan-400 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-between items-center space-y-2 md:space-y-0">
        {/* ข้อความ */}
        <div className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} AdminDashboard. All rights reserved.
        </div>
        {/* หากต้องการเพิ่ม element อื่น ๆ เช่น ลิงก์ */}
        <div className="text-sm text-center md:text-right">
          {/* ตัวอย่างลิงก์ */}
          <a href="#" className="hover:underline mx-1">
            Privacy
          </a>
          |
          <a href="#" className="hover:underline mx-1">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
