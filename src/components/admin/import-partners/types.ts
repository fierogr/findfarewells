
import { FuneralHome } from "@/types/funeralHome";

export interface ImportPartnersModalProps {
  open: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

export interface CSVRow {
  name: string;
  city: string;
  state: string;
  address: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  services: string;
}

export interface ImportStatus {
  success: number;
  errors: number;
  total: number;
}

export interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export interface ImportResultProps {
  importStatus: ImportStatus;
}
