"use client";

import { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Loader2, Calendar, Users } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packageSlug: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  packageName,
  packageSlug,
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Reset states on open/close
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPhone("");
      setMessage(`Hi, I am interested in booking the "${packageName}" package. Please share details and availability.`);
      setSuccess(false);
      setError("");
    }
  }, [isOpen, packageName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
          packageName,
          packageSlug,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-10 transform transition-all duration-300 scale-100">
        
        {/* Header */}
        <div className="bg-ra-navy text-white px-6 py-5 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">Enquire Now</h3>
            <p className="text-xs text-gray-300 mt-0.5">Explore China with Royal Arabian</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 px-4 flex flex-col items-center">
              <CheckCircle2 size={64} className="text-emerald-500 mb-4 animate-bounce" />
              <h4 className="text-xl font-bold text-ra-navy mb-2">Enquiry Submitted!</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Thank you, <strong className="text-ra-navy">{name}</strong>! Your enquiry for the{" "}
                <span className="font-semibold text-ra-orange">"{packageName}"</span> has been logged.
                One of our B2B travel consultants will reach out to you within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="bg-ra-navy text-white w-full py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Selected Package
                </label>
                <div className="bg-orange-50 border border-orange-100 text-ra-orange rounded-md px-3 py-2 text-sm font-semibold">
                  {packageName}
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ra-orange focus:border-ra-orange text-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ra-orange focus:border-ra-orange text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="+971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ra-orange focus:border-ra-orange text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Any extra requirements like dietary needs, hotel tier upgrades, etc."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ra-orange focus:border-ra-orange text-sm text-gray-900"
                />
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ra-orange hover:bg-opacity-95 text-white py-3 rounded-md font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Enquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
