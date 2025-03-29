
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FuneralHome } from "@/types/funeralHome";
import ImageUpload from "../forms/ImageUpload";

interface PhotosTabProps {
  editedHome: FuneralHome;
  onPhotoChange: (field: keyof FuneralHome, value: string) => void;
}

const PhotosTab = ({ editedHome, onPhotoChange }: PhotosTabProps) => {
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
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Εικόνα Εξώφυλλου</h4>
            <ImageUpload 
              imageUrl={editedHome.coverImageUrl || ""} 
              setImageUrl={(url) => onPhotoChange("coverImageUrl", url)} 
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Πρόσθετες Φωτογραφίες</h4>
            <div className="border rounded-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-md">
                  <Button variant="ghost" className="flex flex-col h-full w-full items-center justify-center">
                    <ImageUpload 
                      imageUrl="" 
                      setImageUrl={(url) => {
                        // In a real app, we would add this to an array of additional images
                        console.log("Additional image uploaded:", url);
                      }} 
                    />
                  </Button>
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
