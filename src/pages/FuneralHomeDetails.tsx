
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Star, MapPin, Phone, Globe, Mail, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useFuneralHome } from "@/hooks/useFuneralHome";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { RegionsDisplay } from "@/components/funeral-homes/RegionsDisplay";

const FuneralHomeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: funeralHome, isLoading, error } = useFuneralHome(id as string);

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="flex items-center">
          <Link to="/search-results">
            <Button variant="outline" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Πίσω στα αποτελέσματα</span>
            </Button>
          </Link>
        </div>
        <div className="h-64 w-full rounded-lg bg-gray-200 animate-pulse" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (error || !funeralHome) {
    return (
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <Link to="/search-results">
            <Button variant="outline" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Πίσω στα αποτελέσματα</span>
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Δεν βρέθηκαν στοιχεία</h2>
              <p className="text-muted-foreground">
                Λυπούμαστε, δεν μπορέσαμε να βρούμε το γραφείο τελετών που αναζητάτε.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStarRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center">
        <Link to="/search-results">
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Πίσω στα αποτελέσματα</span>
          </Button>
        </Link>
      </div>

      {funeralHome.coverImageUrl && (
        <div className="w-full rounded-lg overflow-hidden">
          <AspectRatio ratio={3 / 1}>
            <img
              src={funeralHome.coverImageUrl}
              alt={funeralHome.name}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-1">{funeralHome.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {funeralHome.address}, {funeralHome.city}, {funeralHome.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {getStarRating(funeralHome.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({funeralHome.reviewCount} κριτικές)
                    </span>
                  </div>
                </div>
                {funeralHome.featured && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Προτεινόμενο
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{funeralHome.description}</p>

              {/* Added RegionsDisplay component */}
              <RegionsDisplay regions={funeralHome.regions} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{funeralHome.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{funeralHome.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {funeralHome.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={funeralHome.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Ιστοσελίδα
                      </a>
                    </div>
                  )}
                  {funeralHome.hours && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{funeralHome.hours}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">Σχετικά</TabsTrigger>
              <TabsTrigger value="services">Υπηρεσίες</TabsTrigger>
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
            <TabsContent value="services" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Υπηρεσίες</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Παρεχόμενες Υπηρεσίες</h3>
                      <div className="flex flex-wrap gap-2">
                        {funeralHome.services.map((service) => (
                          <Badge key={service} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {funeralHome.amenities && funeralHome.amenities.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">Παροχές</h3>
                        <div className="flex flex-wrap gap-2">
                          {funeralHome.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Πακέτα Υπηρεσιών</CardTitle>
            </CardHeader>
            <CardContent>
              {funeralHome.packages && funeralHome.packages.length > 0 ? (
                <div className="space-y-4">
                  {funeralHome.packages.map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{pkg.name}</h3>
                        <div className="text-lg font-semibold">{pkg.price}€</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">
                        {pkg.description}
                      </p>
                      <div>
                        <h4 className="text-xs uppercase text-muted-foreground mb-1">
                          Περιλαμβάνει:
                        </h4>
                        <ul className="text-sm space-y-1">
                          {pkg.includedServices.map((service, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">
                  Δεν έχουν οριστεί πακέτα υπηρεσιών.
                </p>
              )}
            </CardContent>
          </Card>

          {funeralHome.additionalServices && funeralHome.additionalServices.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Πρόσθετες Υπηρεσίες</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {funeralHome.additionalServices.map((service) => (
                    <div key={service.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{service.name}</div>
                        {service.description && (
                          <div className="text-sm text-muted-foreground">
                            {service.description}
                          </div>
                        )}
                      </div>
                      <div className="font-semibold">{service.price}€</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FuneralHomeDetails;
