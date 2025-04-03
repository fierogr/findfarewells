
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.3";

// Set up CORS headers for browser access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Get Supabase credentials from environment
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

  // Initialize Supabase client with service role key
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { action, userId, email } = await req.json();
    console.log(`Processing ${action} request for user ${userId} (${email})`);

    if (action === "add-admin") {
      // Check if user already exists in admin_users
      const { data: existingAdmin, error: checkError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", userId)
        .single();

      if (checkError && checkError.code !== "PGRST116") { // PGRST116 is "no rows returned"
        throw new Error(`Error checking existing admin: ${checkError.message}`);
      }

      if (existingAdmin) {
        console.log(`User ${userId} is already an admin`);
        return new Response(
          JSON.stringify({ success: true, message: "User is already an admin" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Add user to admin_users table
      const { error: insertError } = await supabase
        .from("admin_users")
        .insert({ id: userId, email: email });

      if (insertError) {
        throw new Error(`Error adding admin user: ${insertError.message}`);
      }

      console.log(`Successfully added ${email} as admin`);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (action === "remove-admin") {
      // Remove user from admin_users table
      const { error: deleteError } = await supabase
        .from("admin_users")
        .delete()
        .eq("id", userId);

      if (deleteError) {
        throw new Error(`Error removing admin user: ${deleteError.message}`);
      }

      console.log(`Successfully removed ${email} from admins`);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      throw new Error("Invalid action specified");
    }
  } catch (error) {
    console.error("Error in manage-admin function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
