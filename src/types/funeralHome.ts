
export interface FuneralHome {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  hours: string;
  description: string;
  about: string;
  imageUrl: string;
  coverImageUrl?: string;
  rating: number;
  reviewCount: number;
  services: string[];
  amenities: string[];
  basicPrice: number;
  featured: boolean;
  packages: ServicePackage[];
  additionalServices: AdditionalService[];
  reviews?: Review[];
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  includedServices: string[];
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}
