
export interface PartnerRequest {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  created_at: string;
  description: string;
  address: string;
  postal_code: string;
  website: string | null;
  services: string | null;
  regions: string[] | null;
}
