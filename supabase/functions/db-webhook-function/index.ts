
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.3";

// Initialize Supabase client with environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  const { type, table, record, schema } = await req.json();

  // Only process new partner registrations
  if (schema === 'public' && table === 'new_partners' && type === 'INSERT') {
    try {
      // Invoke the notify-partner-registration function
      const { error } = await supabase.functions.invoke('notify-partner-registration', {
        body: { record }
      });

      if (error) {
        console.error('Error invoking notify-partner-registration function:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (error) {
      console.error('Error in db-webhook-function:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
  }

  // For other database events, just acknowledge receipt
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
});
