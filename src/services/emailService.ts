
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

// Supabase table name for settings
const SETTINGS_TABLE = 'settings';

/**
 * Get the admin email from database or return the default
 */
export const getAdminEmail = async (): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from(SETTINGS_TABLE)
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
      .from(SETTINGS_TABLE)
      .select('*')
      .eq('key', 'admin_email')
      .single();
    
    if (data) {
      // Update existing record
      const { error } = await supabase
        .from(SETTINGS_TABLE)
        .update({ value: email })
        .eq('key', 'admin_email');
      
      if (error) throw error;
    } else {
      // Insert new record
      const { error } = await supabase
        .from(SETTINGS_TABLE)
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
  const adminEmail = await getAdminEmail();
  
  const subject = `Νέα αίτηση συνεργάτη: ${partnerData.businessName}`;
  
  // Format email body
  const emailBody = `
    Νέα αίτηση συνεργάτη έχει υποβληθεί:
    
    Στοιχεία Επιχείρησης:
    ---------------------
    Επωνυμία: ${partnerData.businessName}
    Ιδιοκτήτης: ${partnerData.ownerName}
    Email: ${partnerData.email}
    Τηλέφωνο: ${partnerData.phone}
    
    Διεύθυνση:
    ---------------------
    Οδός: ${partnerData.address}
    Πόλη: ${partnerData.city}
    ΤΚ: ${partnerData.postalCode}
    
    Πληροφορίες:
    ---------------------
    Ιστοσελίδα: ${partnerData.website || "Δεν παρέχεται"}
    Περιγραφή: ${partnerData.description}
    Υπηρεσίες: ${partnerData.services || "Δεν παρέχεται"}
    
    Ημερομηνία αίτησης: ${new Date().toLocaleString('el-GR')}
  `;
  
  // Since we're implementing a real email system with the edge function,
  // this function could be enhanced to call that function instead of the mock implementation
  console.log('Email would be sent with the following content:', {
    to: adminEmail,
    subject,
    body: emailBody
  });
  
  // Return true to simulate successful email sending
  return true;
};
