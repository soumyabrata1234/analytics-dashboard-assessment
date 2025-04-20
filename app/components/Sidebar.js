'use client'; // Important for client-side rendering

import { useState } from 'react';
import { FaHome,  FaFileAlt, FaCog, FaChartBar ,FaChartPie } from 'react-icons/fa'; // You can use any icons library (like react-icons)
import { RiBarChartFill } from 'react-icons/ri';
import { HiChartBar } from 'react-icons/hi';
import { BiScatterChart } from 'react-icons/bi';
import { TbChartDonut } from 'react-icons/tb';

import Link from 'next/link'; // Assuming you're using Next.js for routing

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`flex flex-col bg-gray-800 text-white p-4 space-y-4 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Hamburger Icon */}
      <div className="flex justify-between items-center">
        <button onClick={toggleSidebar} className="text-white text-2xl">
          {isOpen ? '×' : '≡'}
        </button>
      </div>

      {/* Sidebar Menu Items */}
      <nav className="flex flex-col space-y-4 mt-6">
        <Link
          href="/"
          className="flex items-center space-x-4 hover:bg-gray-700 px-3 py-2 rounded"
        >
          <FaHome className={`transition-all duration-300 ${isOpen ? 'text-xl' : 'text-2xl'}`} />
          {isOpen && <span className="text-white">Home</span>}
        </Link>
        <Link
          href="/bar"
          className="flex items-center space-x-4 hover:bg-gray-700 px-3 py-2 rounded"
        >
          <FaChartBar className={`transition-all duration-300 ${isOpen ? 'text-xl' : 'text-2xl'}`} />
          {isOpen && <span className="text-white">BAR_CHART</span>}
        </Link>
        <Link
          href="/line"
          className="flex items-center space-x-4 hover:bg-gray-700 px-3 py-2 rounded"
        >
          <FaFileAlt className={`transition-all duration-300 ${isOpen ? 'text-xl' : 'text-2xl'}`} />
          {isOpen && <span className="text-white">LINE_CHART</span>}
        </Link>

        <Link
          href="/pie"
          className="flex items-center space-x-4 hover:bg-gray-700 px-3 py-2 rounded"
        >
          <FaChartPie className={`transition-all duration-300 ${isOpen ? 'text-xl' : 'text-2xl'}`} />
          {isOpen && <span className="text-white">PIE_CHART</span>}
        </Link>

        <Link
          href="/Histogram"
          className="flex items-center space-x-4 hover:bg-gray-700 px-3 py-2 rounded"
        >
          <RiBarChartFill  className={`transition-all duration-300 ${isOpen ? 'text-xl' : 'text-2xl'}`} />
          {isOpen && <span className="text-white">HISTOGRAM</span>}
        </Link>

        <Link
          href="/bubble"
          className="flex items-center space-x-4 hover:bg-gray-700 px-3 py-2 rounded"
        >
          <BiScatterChart className={`transition-all duration-300 ${isOpen ? 'text-xl' : 'text-2xl'}`} />
          {isOpen && <span className="text-white">BUBBLE_CHART</span>}
        </Link>

        <Link
          href="/xyz"
          className="flex items-center space-x-4 hover:bg-gray-700 px-3 py-2 rounded"
        >
          <TbChartDonut className={`transition-all duration-300 ${isOpen ? 'text-xl' : 'text-2xl'}`} />
          {isOpen && <span className="text-white">DONUT_CHART</span>}
        </Link>
      </nav>
    </div>
  );
}