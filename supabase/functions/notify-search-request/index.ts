
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

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

    // Get admin email from settings table or use default
    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('key', 'admin_email')
      .single();
    
    const adminEmail = settings?.value || 'admin@riprice.com';
    
    // Format services for email display
    const servicesDisplay = searchRequest.services 
      ? searchRequest.services.join(', ') 
      : 'Καμία συγκεκριμένη υπηρεσία';
    
    // Format the date in Greek format
    const createdAtDate = new Date(searchRequest.created_at);
    const formattedDate = createdAtDate.toLocaleDateString('el-GR', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: 'Riprice <onboarding@resend.dev>',
      to: adminEmail,
      subject: `Νέο αίτημα αναζήτησης για ${searchRequest.prefecture}`,
      html: `
        <h2>Νέο αίτημα αναζήτησης</h2>
        <p>Ένας χρήστης αναζήτησε γραφεία τελετών με τα ακόλουθα στοιχεία:</p>
        
        <h3>Στοιχεία Αναζήτησης:</h3>
        <ul>
          <li><strong>Περιοχή:</strong> ${searchRequest.location}</li>
          <li><strong>Νομός:</strong> ${searchRequest.prefecture}</li>
          <li><strong>Τηλέφωνο επικοινωνίας:</strong> ${searchRequest.phone_number}</li>
          <li><strong>Ζητούμενες υπηρεσίες:</strong> ${servicesDisplay}</li>
          <li><strong>Ημερομηνία αίτησης:</strong> ${formattedDate}</li>
        </ul>
        
        <p>Μπορείτε να δείτε όλα τα αιτήματα αναζήτησης στον <a href="${Deno.env.get('PUBLIC_SITE_URL') || 'https://riprice.com'}/admin">πίνακα διαχείρισης</a>.</p>
      `,
    });
    
    console.log('Email notification sent:', emailResponse);
    
    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: 'Email notification sent successfully' }),
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
