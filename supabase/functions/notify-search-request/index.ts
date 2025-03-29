
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  
  try {
    // Get request data
    const { id } = await req.json();
    
    // Create Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Fetch the search request details
    const { data: searchRequest, error } = await supabaseAdmin
      .from('search_requests')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !searchRequest) {
      console.error('Error fetching search request:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch search request details' }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 400 }
      );
    }
    
    // You'd typically send an email notification here using a service like SendGrid, Resend, etc.
    // For now, we'll just log the details
    console.log('New search request received:');
    console.log('Phone Number:', searchRequest.phone_number);
    console.log('Location:', searchRequest.location);
    console.log('Prefecture:', searchRequest.prefecture);
    console.log('Services:', searchRequest.services);
    console.log('Created At:', searchRequest.created_at);
    
    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: 'Notification would be sent here' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
    
  } catch (error) {
    console.error('Error processing notification:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 500 }
    );
  }
});
