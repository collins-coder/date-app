import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uugokbwkflzhkpwuvjfs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1Z29rYndrZmx6aGtwd3V2amZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwODIyNzQsImV4cCI6MjA5NjY1ODI3NH0.s4Y93Bnl86z9um4RWkmB50Sv9QBGH5Qv2g5Cn-uYSZg";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);