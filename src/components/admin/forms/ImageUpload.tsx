
import React from "react";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Image, Upload, X } from "lucide-react";

interface ImageUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  showLabel?: boolean;
}

const ImageUpload = ({ imageUrl, setImageUrl, showLabel = true }: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this to a server or cloud storage
      // For demo purposes, we're creating a local URL
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div className="mb-4">
      {showLabel && <FormLabel className="block mb-2">Φωτογραφία</FormLabel>}
      
      {imageUrl ? (
        <div className="relative w-full h-40 rounded-md overflow-hidden">
          <img src={imageUrl} alt="Partner" className="object-cover w-full h-full" />
          <Button 
            type="button" 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2"
            onClick={() => setImageUrl("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
          <div className="space-y-2">
            <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-500" />
            </div>
            <div className="flex text-sm text-gray-500">
              <label htmlFor="file-upload" className="mx-auto relative cursor-pointer rounded-md bg-white font-medium text-primary hover:text-primary/90 focus-within:outline-none">
                <span>Ανέβασμα φωτογραφίας</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF μέχρι 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
