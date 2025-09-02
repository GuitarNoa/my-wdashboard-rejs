import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";

export default function Profile() {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 mt-8">
        {/* Header */}
        <div className="relative h-80 bg-gradient-to-t from-green-400 to-cyan-400 rounded-xl">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-xl w-11/12 max-w-md p-6 flex flex-col items-center text-center shadow-lg">
            <img
              className="h-48 w-48 rounded-full object-cover border-4 border-white shadow-md"
              src="/my_profile.jpg"
              alt="Profile"
            />
            <h1 className="mt-4 text-3xl font-bold text-gray-800">Thawatchai Rueanin</h1>
            <h2 className="text-xl text-gray-600">Full Stack Developer</h2>
            {/* Social Buttons */}
            <div className="flex space-x-4 mt-3">
              <a href="#" className="text-blue-500 hover:text-blue-700">LinkedIn</a>
              <a href="#" className="text-gray-800 hover:text-gray-600">GitHub</a>
              <a href="#" className="text-pink-500 hover:text-pink-700">Portfolio</a>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-32 text-center py-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">About Me</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I am a passionate Full Stack Developer with experience in building web applications using React, Next.js, Node.js, and Tailwind CSS. I love creating efficient, responsive, and visually appealing applications.
          </p>
        </div>

        {/* Skills Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full">React</span>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">Next.js</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full">Node.js</span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full">TypeScript</span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">Tailwind CSS</span>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h4 className="font-semibold text-lg">Project A</h4>
              <p className="text-gray-600 mt-2">A web application built with Next.js and Tailwind CSS.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <h4 className="font-semibold text-lg">Project B</h4>
              <p className="text-gray-600 mt-2">E-commerce platform using React and Node.js.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <h4 className="font-semibold text-lg">Project C</h4>
              <p className="text-gray-600 mt-2">Personal portfolio site showcasing my work.</p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
