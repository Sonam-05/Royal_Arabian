"use"
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Globe, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Services", href: "#" },
    { name: "Destinations", href: "#" },
    { name: "Packages", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/cn" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-ra-navy font-serif">
                ROYAL <span className="text-ra-orange">ARABIAN</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-ra-navy hover:text-ra-orange font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-gray-200" />

            <a
              href="tel:+97140000000"
              className="flex items-center gap-1 text-sm font-medium text-ra-navy hover:text-ra-orange transition-colors"
            >
              <Phone size={16} className="text-ra-orange" />
              <span>Talk to us</span>
            </a>

            <Link
              href="#packages"
              className="bg-ra-orange text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Explore Packages
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-ra-navy hover:text-ra-orange focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-ra-navy hover:bg-gray-50 hover:text-ra-orange transition-colors"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-100 my-2 pt-2" />

            <a
              href="tel:+97140000000"
              className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-ra-navy hover:bg-gray-50 hover:text-ra-orange transition-colors"
            >
              <Phone size={18} className="text-ra-orange" />
              <span>Talk to us</span>
            </a>

            <div className="px-3 py-3">
              <Link
                href="#packages"
                className="w-full block text-center bg-ra-orange text-white py-3 rounded-md text-base font-semibold hover:bg-opacity-90 transition-colors"
                onClick={toggleMenu}
              >
                Explore Packages
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
