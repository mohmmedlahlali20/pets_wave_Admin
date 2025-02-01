"use client"

import React, { useState } from "react";
import { Home, Users, Package, Cat, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(false); 

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Manage Users", href: "/dashboard/users", icon: Users },
    { name: "Manage Pets", href: "/dashboard/pets", icon: Cat },
    { name: "Manage Category", href: "/dashboard/categories", icon: Package },
  ];

  return (
    <div>
      <button
        className="md:hidden p-3 text-white bg-gray-900 fixed top-4 left-4 rounded-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-gray-300 flex flex-col shadow-lg transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:relative`}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Admin <span className="text-blue-500 text-3xl px-2">PetsWave</span>
          </h2>
          <button className="md:hidden text-gray-300" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            {menuItems.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                    pathname === href ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="p-4 border-t border-gray-700">
          <p className="text-xs text-gray-500">&copy; 2025 PetsWave</p>
        </footer>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
