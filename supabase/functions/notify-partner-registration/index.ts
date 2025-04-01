
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.3";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Initialize Supabase client with environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    // Get admin email from settings
    const { data: settingsData, error: settingsError } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "admin_email")
      .single();

    if (settingsError) {
      console.error("Error fetching admin email:", settingsError);
      throw new Error("Could not fetch admin email");
    }

    const adminEmail = settingsData?.value || "admin@riprice.com";

    // Format email content
    const subject = `Νέα εγγραφή συνεργάτη: ${record.business_name}`;
    const emailHtml = `
      <h1>Νέα εγγραφή συνεργάτη</h1>
      <p>Ένας νέος συνεργάτης έχει εγγραφεί στην πλατφόρμα.</p>
      <h2>Στοιχεία Επιχείρησης</h2>
      <ul>
        <li><strong>Επωνυμία:</strong> ${record.business_name}</li>
        <li><strong>Ιδιοκτήτης:</strong> ${record.owner_name}</li>
        <li><strong>Email:</strong> ${record.email}</li>
        <li><strong>Τηλέφωνο:</strong> ${record.phone}</li>
      </ul>
      <h2>Διεύθυνση</h2>
      <ul>
        <li><strong>Οδός:</strong> ${record.address}</li>
        <li><strong>Πόλη:</strong> ${record.city}</li>
        <li><strong>ΤΚ:</strong> ${record.postal_code}</li>
      </ul>
      <h2>Περιγραφή</h2>
      <p>${record.description}</p>
      <p><strong>Ημερομηνία εγγραφής:</strong> ${new Date().toLocaleString('el-GR')}</p>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "RiPrice <onboarding@resend.dev>",
      to: [adminEmail],
      subject: subject,
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email notification");
    }

    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ success: true, message: "Email notification sent" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in notify-partner-registration function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
