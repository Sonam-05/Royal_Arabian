import Link from "next/link";
import { MapPin, Mail, Phone, Calendar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0e1b31] text-gray-300 pt-16 pb-8 border-t-2 border-ra-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div>
            <span className="text-2xl font-bold tracking-wider text-white font-serif block mb-4">
              ROYAL <span className="text-ra-orange">ARABIAN</span>
            </span>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your trusted Destination Management Partner. Experience extraordinary journeys across the UAE, China, Kenya, Sri Lanka, and Vietnam with local expertise.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-9 w-9 rounded-full bg-gray-800 hover:bg-ra-orange text-white flex items-center justify-center transition-colors">
                <span className="sr-only">Facebook</span>
                f
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-gray-800 hover:bg-ra-orange text-white flex items-center justify-center transition-colors">
                <span className="sr-only">Instagram</span>
                i
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-gray-800 hover:bg-ra-orange text-white flex items-center justify-center transition-colors">
                <span className="sr-only">LinkedIn</span>
                in
              </a>
            </div>
          </div>

          {/* UAE Offices */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-800 pb-2">UAE Offices</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-2">
                <MapPin size={18} className="text-ra-orange flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Dubai Head Office</strong>
                  Royal Arabian Destination Management DMCC, 2102, Jumeirah Bay X3, Plot No: JLT-PH2-X3A, Jumeirah Lake Tower, Dubai, UAE.
                </div>
              </li>
              <li className="flex gap-2">
                <MapPin size={18} className="text-ra-orange flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Abu Dhabi Office</strong>
                  Royal Arabian Tours LLC, Rashid Saif Jabr Alsuweidi Building 2, Musaffah M39, Office 2, Abu Dhabi, UAE.
                </div>
              </li>
            </ul>
          </div>

          {/* Shanghai Office */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-800 pb-2">China Office</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-2">
                <MapPin size={18} className="text-ra-orange flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Shanghai Office</strong>
                  Room 7025, Zhongyi Building, No. 580 West Nanjing Road, Jingan District, Shanghai, China.
                </div>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="text-ra-orange flex-shrink-0 mt-0.5" />
                <span>china@royalarabian.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-800 pb-2">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              <Link href="#" className="hover:text-ra-orange transition-colors">About Us</Link>
              <Link href="#" className="hover:text-ra-orange transition-colors">T&C</Link>
              <Link href="#" className="hover:text-ra-orange transition-colors">Contact Us</Link>
              <Link href="#" className="hover:text-ra-orange transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-ra-orange transition-colors">Careers</Link>
              <Link href="#" className="hover:text-ra-orange transition-colors">Payment Policy</Link>
              <Link href="#" className="hover:text-ra-orange transition-colors">FAQ</Link>
              <Link href="#" className="hover:text-ra-orange transition-colors">Blogs</Link>
              <Link href="#" className="hover:text-ra-orange transition-colors">Glossary</Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© Copyright 2009-2026. Royal Arabian Destination Management DMCC. Dubai, United Arab Emirates. ® All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-ra-orange transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-ra-orange transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-ra-orange transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
