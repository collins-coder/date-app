import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uugokbwkflzhkpwuvjfs.supabase.co";
const supabaseAnonKey = "sb_secret_vDLtPaYlQahWSnp3jAqtPw_-sgWRbF7";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);