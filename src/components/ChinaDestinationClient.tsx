"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Calendar, ArrowRight, CheckCircle2, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import type { Destination, PackageWithDestination } from "@/types";
import { getImageUrl, formatPrice } from "@/lib/utils";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GoodToKnow from "./GoodToKnow";
import EnquiryModal from "./EnquiryModal";

interface ChinaDestinationClientProps {
  destination: Destination;
  packages: PackageWithDestination[];
  isMock?: boolean;
}

export default function ChinaDestinationClient({
  destination,
  packages,
  isMock = false,
}: ChinaDestinationClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({ name: "", slug: "" });

  const openEnquiry = (name: string, slug: string) => {
    setSelectedPackage({ name, slug });
    setModalOpen(true);
  };

  const paragraphs = destination.description.split("\n\n");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Developer Demo Banner */}
      {isMock && (
        <div className="bg-amber-600 text-white text-xs px-4 py-2 text-center font-medium shadow-sm flex items-center justify-center gap-2 relative z-50">
          <Sparkles size={14} className="animate-spin" />
          <span>
            <strong>Developer Assessment Info:</strong> Showing offline fallback mock data because Sanity credentials are not set up in environment variables. Run the <code>npm run seed</code> command to load it to your Sanity.
          </span>
        </div>
      )}

      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[65vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: `url(${getImageUrl(destination.heroImage)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white z-10">
          <div className="max-w-2xl">
            <span className="text-ra-gold font-bold tracking-widest text-xs sm:text-sm uppercase block mb-3 animate-pulse">
              {destination.tagline || "Explore the Land of the Dragon"}
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif mb-6 drop-shadow-md">
              {destination.name}
            </h1>
            <p className="text-sm sm:text-lg text-gray-200 leading-relaxed mb-8 drop-shadow-sm">
              Discover a timeless civilization where ancient wonders meet hyper-modern wonders, crafted with the local expertise of Royal Arabian DMC.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#packages"
                className="bg-ra-orange hover:bg-opacity-95 text-white font-semibold px-6 py-3.5 rounded-md text-sm sm:text-base transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View Curated Packages
              </a>
              <a
                href="#overview"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-6 py-3.5 rounded-md text-sm sm:text-base transition-all backdrop-blur-sm"
              >
                Read Destination Guide
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Overview & Highlights Section */}
      <section id="overview" className="py-16 sm:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column - Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-ra-orange font-bold uppercase tracking-wider text-xs">
                <Compass size={16} />
                <span>Destination Overview</span>
              </div>
              <h2 className="text-3xl font-bold text-ra-navy font-serif tracking-tight">
                About {destination.name}
              </h2>
              <div className="w-16 h-1 bg-ra-gold rounded" />
              
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                {paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Right Column - Highlights */}
            <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 self-start">
              <h3 className="text-xl font-bold text-ra-navy font-serif mb-6">
                Key Travel Highlights
              </h3>
              <ul className="space-y-4">
                {destination.highlights?.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3 text-sm sm:text-base">
                    <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center gap-4">
                <ShieldCheck size={40} className="text-ra-gold flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-ra-navy text-sm">Royal Arabian Guarantee</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                    End-to-end B2B planning, vetted premium hotels, and multi-lingual professional guides.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 sm:py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-ra-orange font-bold uppercase tracking-wider text-xs">
              Explore Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-ra-navy font-serif mt-2 tracking-tight">
              Curated China Travel Programs
            </h2>
            <div className="w-16 h-1 bg-ra-gold rounded mx-auto mt-4" />
            <p className="text-sm sm:text-base text-gray-600 mt-4">
              Expertly managed tour packages combining iconic cultural discoveries, modern wonders, and comfortable premium lodging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col group transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Package Card Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={getImageUrl(pkg.heroImage)}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-ra-navy/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm shadow-md">
                    <Calendar size={12} className="text-ra-gold" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-ra-navy font-serif mb-2 group-hover:text-ra-orange transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-grow line-clamp-3">
                    {pkg.shortDescription}
                  </p>

                  {/* Inclusions summary */}
                  <div className="border-t border-slate-100 pt-4 mb-4">
                    <h4 className="text-2xs font-bold text-gray-400 uppercase tracking-widest mb-2">What's Included</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.included?.slice(0, 3).map((inc, i) => (
                        <span key={i} className="text-2xs bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100 truncate max-w-full">
                          ✓ {inc}
                        </span>
                      ))}
                      {pkg.included && pkg.included.length > 3 && (
                        <span className="text-2xs bg-slate-50 text-slate-400 px-2 py-1 rounded border border-slate-100">
                          +{pkg.included.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-2xs text-gray-400 block">Starting from</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-ra-navy">
                          {formatPrice(pkg.price)}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(pkg.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Link
                      href={`/cn/packages/${pkg.slug.current}`}
                      className="text-center border border-ra-navy text-ra-navy hover:bg-ra-navy hover:text-white px-4 py-2.5 rounded text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      Details <ArrowRight size={12} />
                    </Link>
                    <button
                      onClick={() => openEnquiry(pkg.name, pkg.slug.current)}
                      type="button"
                      className="bg-ra-orange text-white hover:bg-opacity-95 px-4 py-2.5 rounded text-xs font-semibold transition-all shadow hover:shadow-md"
                    >
                      Enquire Now
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Information section (Good to Know) */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-ra-orange font-bold uppercase tracking-wider text-xs">
              Travel Planning
            </span>
            <h2 className="text-3xl font-bold text-ra-navy font-serif mt-2 tracking-tight">
              Good to Know before visiting
            </h2>
            <div className="w-12 h-1 bg-ra-gold rounded mx-auto mt-4" />
            <p className="text-sm text-gray-500 mt-3">
              Essential practical information to ensure a seamless business or leisure trip to China.
            </p>
          </div>

          <GoodToKnow items={destination.goodToKnow} />
        </div>
      </section>

      {/* B2B call to action */}
      <section className="bg-ra-navy text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-serif mb-4">
            Partner with Royal Arabian China DMC
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-8">
            Are you a B2B travel agency, tour operator, or corporate organizer? Let us curate tailor-made packages with unbeatable logistics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:china@royalarabian.com"
              className="bg-ra-orange hover:bg-opacity-95 text-white font-semibold px-6 py-3 rounded text-sm sm:text-base transition-all shadow"
            >
              Email Our B2B Desk
            </a>
            <a
              href="tel:+97140000000"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded text-sm sm:text-base transition-all"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName={selectedPackage.name}
        packageSlug={selectedPackage.slug}
      />

    </div>
  );
}
