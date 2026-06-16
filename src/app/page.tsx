import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Database, Award } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0e1b31] flex flex-col items-center justify-center p-6 text-white font-sans">
      
      {/* Container */}
      <div className="max-w-4xl w-full text-center space-y-8 animate-fadeIn">
        
        {/* Brand/Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 text-ra-gold text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            <Compass size={14} className="animate-spin-slow" />
            <span>Developer Assessment Portal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-wide">
            ROYAL <span className="text-ra-orange">ARABIAN</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
            Senior Full-Stack Developer Assessment Submission. Powering China Destination Management with Next.js, Sanity CMS, & Supabase.
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <Link
            href="/cn"
            className="inline-flex items-center gap-2 bg-ra-orange hover:bg-opacity-95 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-200 transform hover:-translate-y-0.5 group text-base sm:text-lg"
          >
            <span>Explore China DMC (/cn)</span>
            <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Setup and Overview Details Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-left max-w-2xl mx-auto backdrop-blur-sm">
          <h2 className="text-lg font-bold text-ra-gold flex items-center gap-2 border-b border-white/15 pb-3 mb-4">
            <Database size={18} />
            <span>Project Deliverables & Setup</span>
          </h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-gray-300">
            <p>
              This app is fully functional out-of-the-box using local mock fallbacks if credentials are not configured. To test the live CMS and database integrations:
            </p>
            
            <ol className="list-decimal list-inside space-y-2.5 pl-1">
              <li>
                <span className="font-semibold text-white">Sanity CMS Schema:</span> copy schemas from <code>sanity/schemas/</code> folder into your studio.
              </li>
              <li>
                <span className="font-semibold text-white">Environment Configuration:</span> create a <code>.env.local</code> file at root:
                <pre className="bg-black/40 text-gray-400 p-2.5 rounded mt-1.5 font-mono text-2xs overflow-x-auto border border-white/5">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_sanity_write_token (needed only for seeding)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url (optional, for book now)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key (optional, for book now)`}
                </pre>
              </li>
              <li>
                <span className="font-semibold text-white">Seed Database:</span> run <code>npm run seed</code> in terminal to automatically upload all mock documents and image assets to your Sanity.
              </li>
            </ol>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 pt-4 text-gray-400 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>Responsive Layout</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-ra-gold" />
            <span>TypeScript Configured</span>
          </div>
          <div className="flex items-center gap-2">
            <Database size={16} className="text-ra-orange" />
            <span>Supabase Enquiries</span>
          </div>
        </div>

      </div>
    </main>
  );
}
