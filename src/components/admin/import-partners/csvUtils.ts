
import { CSVRow } from "./types";
import { FuneralHome } from "@/types/funeralHome";

export const parseCSV = (text: string): CSVRow[] => {
  const lines = text.split("\n");
  const headers = lines[0].split(",").map(header => header.trim());
  
  const results: CSVRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(",").map(value => value.trim());
    const row: any = {};
    
    headers.forEach((header, index) => {
      const lowerHeader = header.toLowerCase();
      if (index < values.length) {
        row[lowerHeader] = values[index].replace(/^"(.*)"$/, "$1");
      } else {
        row[lowerHeader] = "";
      }
    });
    
    results.push(row as CSVRow);
  }
  
  return results;
};

export const convertToFuneralHome = (row: CSVRow): FuneralHome => {
  // Split services into an array if it's a comma-separated string
  const servicesArray = row.services ? row.services.split(';').map(s => s.trim()) : [];
  
  return {
    id: crypto.randomUUID(),
    name: row.name || "",
    city: row.city || "",
    state: row.state || "",
    address: row.address || "",
    zip: row.zip || "",
    phone: row.phone || "",
    email: row.email || "",
    website: row.website || "",
    hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm, Sun: Closed",
    description: row.description || "",
    about: row.description || "",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1468779065891-103dac4a7c48",
    rating: 0,
    reviewCount: 0,
    services: servicesArray,
    amenities: [],
    basicPrice: 0,
    featured: false,
    packages: [],
    additionalServices: [],
    reviews: []
  };
};
