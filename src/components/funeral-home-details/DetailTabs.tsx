
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FuneralHome } from "@/types/funeralHome";

interface DetailTabsProps {
  funeralHome: FuneralHome;
  getStarRating: (rating: number) => JSX.Element[];
}

const DetailTabs = ({ funeralHome, getStarRating }: DetailTabsProps) => {
  return (
    <Tabs defaultValue="about">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="about">Σχετικά</TabsTrigger>
        <TabsTrigger value="reviews">Κριτικές</TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Σχετικά με εμάς</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{funeralHome.about || funeralHome.description}</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Κριτικές Πελατών</CardTitle>
          </CardHeader>
          <CardContent>
            {funeralHome.reviews && funeralHome.reviews.length > 0 ? (
              <div className="space-y-4">
                {funeralHome.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    <div className="flex items-center my-1">
                      {getStarRating(review.rating)}
                    </div>
                    <p className="text-sm mt-1">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">
                Δεν υπάρχουν κριτικές ακόμα.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DetailTabs;
