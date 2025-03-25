
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { FuneralHome } from "@/types/funeralHome";

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
            <div className="border rounded-md p-4 text-center">
              {editedHome.imageUrl ? (
                <div className="relative">
                  <img
                    src={editedHome.imageUrl}
                    alt="Main image"
                    className="h-60 w-full object-cover rounded-md"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={() => onPhotoChange("imageUrl", "")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-md">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Δεν υπάρχει εικόνα</p>
                </div>
              )}
              <Button variant="outline" className="mt-4">
                <Upload className="mr-2 h-4 w-4" /> Μεταφόρτωση
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Εικόνα Εξώφυλλου</h4>
            <div className="border rounded-md p-4 text-center">
              {editedHome.coverImageUrl ? (
                <div className="relative">
                  <img
                    src={editedHome.coverImageUrl}
                    alt="Cover image"
                    className="h-40 w-full object-cover rounded-md"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={() => onPhotoChange("coverImageUrl", "")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-md">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Δεν υπάρχει εικόνα εξώφυλου</p>
                </div>
              )}
              <Button variant="outline" className="mt-4">
                <Upload className="mr-2 h-4 w-4" /> Μεταφόρτωση
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Πρόσθετες Φωτογραφίες</h4>
            <div className="border rounded-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-md">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Προσθήκη φωτογραφίας</p>
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
