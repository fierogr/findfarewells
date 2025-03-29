
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import { FuneralHome } from "@/types/funeralHome";
import ImageUpload from "../forms/ImageUpload";

interface PhotosTabProps {
  editedHome: FuneralHome;
  onPhotoChange: (field: keyof FuneralHome, value: string) => void;
}

const PhotosTab = ({ editedHome, onPhotoChange }: PhotosTabProps) => {
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    editedHome.additionalImages || []
  );

  const handleAdditionalImageUpload = (url: string) => {
    const newImages = [...additionalImages, url];
    setAdditionalImages(newImages);
    // Update the parent component if needed
    // onPhotoChange("additionalImages", newImages);
  };

  const handleRemoveAdditionalImage = (index: number) => {
    const newImages = additionalImages.filter((_, i) => i !== index);
    setAdditionalImages(newImages);
    // Update the parent component if needed
    // onPhotoChange("additionalImages", newImages);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Φωτογραφίες</CardTitle>
        <CardDescription>
          Διαχείριση φωτογραφιών του γραφείου τελετών.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Κύρια Φωτογραφία</h4>
            <ImageUpload 
              imageUrl={editedHome.imageUrl} 
              setImageUrl={(url) => onPhotoChange("imageUrl", url)} 
              showLabel={false}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Εικόνα Εξώφυλλου</h4>
            <ImageUpload 
              imageUrl={editedHome.coverImageUrl || ""} 
              setImageUrl={(url) => onPhotoChange("coverImageUrl", url)} 
              showLabel={false}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Πρόσθετες Φωτογραφίες</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {additionalImages.map((url, index) => (
                <div key={index} className="relative h-48 rounded-md overflow-hidden border border-gray-200">
                  <img src={url} alt={`Additional ${index}`} className="object-cover w-full h-full" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveAdditionalImage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <div className="border border-dashed border-gray-300 rounded-md p-4 h-48 flex flex-col items-center justify-center">
                <div className="space-y-2 text-center">
                  <div className="mx-auto h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="text-gray-500">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="relative overflow-hidden"
                    >
                      <span>Προσθήκη</span>
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            handleAdditionalImageUpload(url);
                          }
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotosTab;
