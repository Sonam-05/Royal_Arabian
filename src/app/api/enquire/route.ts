import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Initialize Supabase Client optionally
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, packageName, packageSlug, message } = body;

    // Validation
    if (!name || !email || !phone || !packageName) {
      return NextResponse.json(
        { error: "Name, Email, Phone and Package Name are required fields." },
        { status: 400 }
      );
    }

    const enquiryData = {
      name,
      email,
      phone,
      package_name: packageName,
      package_slug: packageSlug || "",
      message: message || "",
      created_at: new Date().toISOString(),
    };

    let savedToSupabase = false;
    let savedToLocal = false;

    // 1. Try to save to Supabase if configured
    if (supabase) {
      try {
        const { error } = await supabase.from("enquiries").insert([enquiryData]);
        if (error) {
          console.error("Supabase insert error:", error.message);
        } else {
          savedToSupabase = true;
          console.log("Successfully saved enquiry to Supabase table.");
        }
      } catch (err) {
        console.error("Supabase exception:", err);
      }
    }

    // 2. Always fallback or also log to a local file for developer review
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "enquiries.json");
      
      let existingEnquiries = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        existingEnquiries = JSON.parse(fileContent || "[]");
      }

      existingEnquiries.push({
        ...enquiryData,
        id: Math.random().toString(36).substring(2, 9),
      });

      fs.writeFileSync(filePath, JSON.stringify(existingEnquiries, null, 2));
      savedToLocal = true;
      console.log("Saved enquiry to local file data/enquiries.json");
    } catch (fsErr) {
      console.error("Failed to write enquiry to local storage:", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully!",
      integration: {
        supabase: savedToSupabase,
        localFile: savedToLocal,
      },
      data: enquiryData,
    });
  } catch (err: any) {
    console.error("Enquiry API handler error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err?.message || "" },
      { status: 500 }
    );
  }
}
