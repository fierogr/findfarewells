
/**
 * Email Service
 * 
 * This service manages email notifications and settings.
 */

import { supabase } from "@/integrations/supabase/client";

interface EmailContent {
  to: string;
  subject: string;
  body: string;
}

/**
 * Get the admin email from database or return the default
 */
export const getAdminEmail = async (): Promise<string> => {
  try {
    // Now using the SQL-safe query that matches the database schema
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'admin_email')
      .single();
    
    if (error || !data) {
      console.error('Error fetching admin email:', error);
      return 'admin@riprice.com';
    }
    
    return data.value;
  } catch (error) {
    console.error('Error in getAdminEmail:', error);
    return 'admin@riprice.com';
  }
};

/**
 * Set the admin email in the database
 */
export const setAdminEmail = async (email: string): Promise<boolean> => {
  try {
    // Check if the admin_email setting already exists
    const { data } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'admin_email')
      .single();
    
    if (data) {
      // Update existing record
      const { error } = await supabase
        .from('settings')
        .update({ value: email })
        .eq('key', 'admin_email');
      
      if (error) throw error;
    } else {
      // Insert new record
      const { error } = await supabase
        .from('settings')
        .insert({ key: 'admin_email', value: email });
      
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving admin email:', error);
    return false;
  }
};

/**
 * Sends a partner registration notification to the admin
 */
export const sendPartnerRegistrationNotification = async (partnerData: any): Promise<boolean> => {
  try {
    // Call the Supabase Edge Function to send the email notification
    const { error } = await supabase.functions.invoke('notify-partner-registration', {
      body: { record: partnerData }
    });
    
    if (error) {
      console.error('Error invoking notify-partner-registration function:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in sendPartnerRegistrationNotification:', error);
    return false;
  }
};
