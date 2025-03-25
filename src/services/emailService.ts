
/**
 * Email Service
 * 
 * This is a placeholder for a real email service implementation.
 * In a production environment, this would connect to an email service provider
 * like SendGrid, Mailgun, or your own SMTP server through a backend API.
 */

interface EmailContent {
  to: string;
  subject: string;
  body: string;
}

// Local storage key for admin email
const ADMIN_EMAIL_STORAGE_KEY = 'riprice_admin_email';

/**
 * Get the admin email from localStorage or return the default
 */
export const getAdminEmail = (): string => {
  const storedEmail = localStorage.getItem(ADMIN_EMAIL_STORAGE_KEY);
  return storedEmail || 'admin@riprice.com';
};

/**
 * Set the admin email in localStorage
 */
export const setAdminEmail = (email: string): void => {
  localStorage.setItem(ADMIN_EMAIL_STORAGE_KEY, email);
};

/**
 * Sends an email notification
 * NOTE: This is a mock implementation and doesn't actually send emails.
 * In a real app, this would be connected to your email service provider API.
 */
export const sendEmail = async (content: EmailContent): Promise<boolean> => {
  // This is where you would call your email service provider API
  console.log('Email would be sent with the following content:', content);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return true to simulate successful email sending
  return true;
};

/**
 * Sends a partner registration notification to the admin
 */
export const sendPartnerRegistrationNotification = async (partnerData: any): Promise<boolean> => {
  const adminEmail = getAdminEmail();
  
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
  
  return await sendEmail({
    to: adminEmail,
    subject,
    body: emailBody
  });
};
