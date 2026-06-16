"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import type { GoodToKnowItem } from "@/types";

interface GoodToKnowProps {
  items: GoodToKnowItem[];
}

export default function GoodToKnow({ items }: GoodToKnowProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={item._key || index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-ra-navy hover:text-ra-orange hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <Info size={18} className="text-ra-orange" />
                <span>{item.title}</span>
              </div>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform duration-300 ${
                  isOpen ? "transform rotate-185 text-ra-orange" : ""
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-40 border-t border-gray-100" : "max-h-0"
              }`}
            >
              <div className="px-5 py-4 text-sm text-gray-600 leading-relaxed bg-slate-50/50">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
