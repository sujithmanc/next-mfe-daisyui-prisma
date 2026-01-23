"use client";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";


export default function RootLayout({ children }) {
  const pages = [
    { name: "Home", path: "/" },
    { name: "Flipkart Cart", path: "/cart" },
    { name: "Employee", path: "/emp" },
    { name: "Data Fetch", path: "/datafetch" },
    { name: "Food", path: "/food" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-base-100">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50">
          <div className="navbar-start">
            {/* Burger button */}
            <button
              className="btn btn-ghost lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link href="/" className="btn btn-ghost text-xl">
              My App
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link href={page.path}>{page.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end">
            <a className="btn">Button</a>
          </div>
        </div>

        {/* Full-screen mobile menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-base-200 z-40 flex flex-col items-center justify-center space-y-6">
            <button
              className="btn btn-circle btn-outline absolute top-4 right-4"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            {pages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="btn btn-lg btn-outline w-3/4"
                onClick={() => setMenuOpen(false)}
              >
                {page.name}
              </Link>
            ))}
          </div>
        )}

        {/* Page content */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}