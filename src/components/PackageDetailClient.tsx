"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Check, 
  Send, 
  Loader2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ShieldCheck,
  Award
} from "lucide-react";
import type { PackageWithDestination } from "@/types";
import { getImageUrl, formatPrice } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PackageDetailClientProps {
  pkg: PackageWithDestination;
  isMock?: boolean;
}

export default function PackageDetailClient({
  pkg,
  isMock = false,
}: PackageDetailClientProps) {
  // Sidebar Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `Hi, I am interested in booking the "${pkg.name}" (${pkg.duration}) package. Please share availability and details.`
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Itinerary collapsible states (track open days)
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({
    1: true, // Default open day 1
  });

  const toggleDay = (day: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          packageName: pkg.name,
          packageSlug: pkg.slug.current,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Fallback Notice */}
      {isMock && (
        <div className="bg-amber-600 text-white text-xs px-4 py-2 text-center font-medium shadow-sm flex items-center justify-center gap-2 relative z-50">
          <Sparkles size={14} className="animate-spin" />
          <span>
            <strong>Developer Assessment Info:</strong> Showing offline fallback mock data because Sanity credentials are not set up in environment variables. Run the <code>npm run seed</code> command to load it to your Sanity.
          </span>
        </div>
      )}

      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Back Link */}
          <Link
            href="/cn"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ra-navy hover:text-ra-orange transition-colors mb-6 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to China Destination</span>
          </Link>

          {/* Package Title Banner */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div>
                <span className="bg-orange-50 text-ra-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-orange-100 mb-3 inline-block">
                  {pkg.duration}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-ra-navy font-serif tracking-tight">
                  {pkg.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <MapPin size={16} className="text-ra-gold" />
                  <span>China Destination Program</span>
                </div>
              </div>
              <div className="lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0">
                <span className="text-xs text-gray-400 block">Starting price</span>
                <div className="flex items-baseline gap-2 lg:justify-end">
                  <span className="text-3xl font-black text-ra-navy">
                    {formatPrice(pkg.price)}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(pkg.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-2xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-1 inline-block">
                  All-Inclusive B2B Rate
                </span>
              </div>
            </div>
          </div>

          {/* Two Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (2/3 width) - Details, Inclusions, Itinerary */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Package Hero Image */}
              <div className="relative h-[40vh] sm:h-[50vh] rounded-xl overflow-hidden shadow-sm">
                <img
                  src={getImageUrl(pkg.heroImage)}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
                <h2 className="text-xl font-bold text-ra-navy font-serif border-b border-slate-100 pb-3">
                  Program Overview
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {pkg.shortDescription}
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
                <h2 className="text-xl font-bold text-ra-navy font-serif border-b border-slate-100 pb-3">
                  What's Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {pkg.included?.map((inclusion, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <span className="bg-emerald-50 rounded-full p-1 border border-emerald-100 text-emerald-500 mt-0.5 flex-shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-sm text-slate-700 font-medium">{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-ra-navy font-serif border-b border-slate-100 pb-3">
                  Day-by-Day Itinerary
                </h2>
                
                {/* Vertical Timeline */}
                <div className="relative pl-6 sm:pl-8 border-l border-slate-200 space-y-6 pt-2">
                  {pkg.itinerary?.map((item, idx) => {
                    const isExpanded = !!expandedDays[item.day];
                    return (
                      <div key={item._key || idx} className="relative group">
                        
                        {/* Bullet Marker */}
                        <button
                          onClick={() => toggleDay(item.day)}
                          type="button"
                          className={`absolute -left-[37px] sm:-left-[45px] top-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 bg-white flex items-center justify-center font-bold text-xs sm:text-sm transition-all focus:outline-none ${
                            isExpanded 
                              ? "border-ra-orange text-ra-orange scale-110 shadow-sm" 
                              : "border-slate-300 text-slate-500 hover:border-ra-navy hover:text-ra-navy"
                          }`}
                        >
                          {item.day}
                        </button>

                        {/* Content Card */}
                        <div className="bg-slate-50 hover:bg-slate-50/80 border border-slate-100 rounded-lg p-4 sm:p-5 transition-colors">
                          <button
                            onClick={() => toggleDay(item.day)}
                            type="button"
                            className="w-full text-left font-bold text-sm sm:text-base text-ra-navy hover:text-ra-orange transition-colors flex justify-between items-center"
                          >
                            <span>Day {item.day}: {item.title}</span>
                            <span className="text-2xs text-gray-400 font-semibold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wider block">
                              {isExpanded ? "Hide" : "Details"}
                            </span>
                          </button>
                          
                          <div
                            className={`transition-all duration-300 overflow-hidden ${
                              isExpanded ? "max-h-80 mt-3" : "max-h-0"
                            }`}
                          >
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-slate-200/60 pt-3">
                              {item.description}
                            </p>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column (1/3 width) - Sticky Booking Widget */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6 sticky top-24 space-y-6">
                
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="font-bold text-ra-navy text-lg font-serif">Submit Enquiry</h3>
                  <p className="text-xs text-gray-500 mt-1">Fill out the details below to contact our destination planners.</p>
                </div>

                {success ? (
                  <div className="text-center py-6 px-2 flex flex-col items-center">
                    <CheckCircle2 size={48} className="text-emerald-500 mb-3 animate-bounce" />
                    <h4 className="font-bold text-ra-navy text-base mb-1">Enquiry Sent!</h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      Thank you, {name}! Your enquiry for <strong>"{pkg.name}"</strong> has been logged. Our consultant will reply shortly.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="bg-ra-navy text-white text-xs px-4 py-2 rounded font-semibold hover:bg-opacity-90 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div>
                      <label htmlFor="widget-name" className="block text-3xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="widget-name"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-ra-orange focus:border-ra-orange"
                      />
                    </div>

                    <div>
                      <label htmlFor="widget-email" className="block text-3xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="widget-email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-ra-orange focus:border-ra-orange"
                      />
                    </div>

                    <div>
                      <label htmlFor="widget-phone" className="block text-3xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="widget-phone"
                        required
                        placeholder="+971 50 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-ra-orange focus:border-ra-orange"
                      />
                    </div>

                    <div>
                      <label htmlFor="widget-message" className="block text-3xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Message / Special Request
                      </label>
                      <textarea
                        id="widget-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-ra-orange focus:border-ra-orange"
                      />
                    </div>

                    {error && (
                      <div className="text-3xs text-red-600 bg-red-50 p-2 rounded border border-red-100">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-ra-orange hover:bg-opacity-95 text-white py-2.5 rounded font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Additional Trust Badges */}
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="flex gap-2.5 items-center text-slate-600">
                    <ShieldCheck size={18} className="text-ra-gold flex-shrink-0" />
                    <span className="text-2xs font-semibold">100% Reliable Local Operations</span>
                  </div>
                  <div className="flex gap-2.5 items-center text-slate-600">
                    <Award size={18} className="text-ra-gold flex-shrink-0" />
                    <span className="text-2xs font-semibold">Trusted B2B Partner in UAE & China</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
