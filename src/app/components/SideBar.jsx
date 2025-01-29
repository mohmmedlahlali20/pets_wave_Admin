import React from "react";
import { Home, Users, Package, Cat } from "lucide-react"; // Example icons
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-gray-300 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">Admin <span className="text-blue-500 text-3xl px-4">PetsWave</span></h2>
      </div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition"
            >
              <Users className="w-5 h-5 mr-3" />
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition"
            >
              <Cat className="w-5 h-5 mr-3" />
              Manage Pets
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition"
            >
              <Package className="w-5 h-5 mr-3" />
              Manage Category
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">&copy; 2025 PetsWave</p>
      </footer>
    </div>
  );
}
