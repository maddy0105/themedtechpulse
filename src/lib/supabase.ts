import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zsemgxaqzkdqajirhcvd.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZW1neGFxemtkcWFqaXJoY3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNzc2NTksImV4cCI6MjA5OTk1MzY1OX0.rvEXFumy17kTBnCENfz_Ys9vsceR3tfDnOKba4e6Cs8";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (typeof window === "undefined") {
    console.log(
      "[Supabase Info] Using fallback credentials to connect to the MedTech Pulse database."
    );
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
