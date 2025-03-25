
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Globe,
  ChevronRight,
  Heart,
  Share2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { getFuneralHomeById } from "@/services/funeralHomeService";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";

const FuneralHomeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [funeralHome, setFuneralHome] = useState<FuneralHome | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (id) {
      fetchFuneralHome(id);
    }
  }, [id]);

  const fetchFuneralHome = async (homeId: string) => {
    setLoading(true);
    try {
      const home = await getFuneralHomeById(homeId);
      setFuneralHome(home);
      // Scroll to top when data is loaded
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching funeral home details:", error);
      toast({
        title: "Error",
        description: "Failed to load funeral home details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="text-lg">Loading funeral home details...</span>
      </div>
    );
  }

  if (!funeralHome) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Funeral Home Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The funeral home you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/search">
          <Button>Back to Search Results</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6 animate-fadeIn">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/search" className="hover:text-foreground">
          Search Results
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">{funeralHome.name}</span>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden h-64 md:h-96 mb-8 animate-fadeIn">
        <img
          src={funeralHome.coverImageUrl || funeralHome.imageUrl}
          alt={funeralHome.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="container p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
              {funeralHome.name}
            </h1>
            <div className="flex items-center text-white/90 mb-2">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(funeralHome.rating)
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-sm">
                {funeralHome.rating} ({funeralHome.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center text-white/90">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{funeralHome.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 mb-8 animate-fadeIn delay-100">
        <Button className="flex-grow md:flex-grow-0">Contact Now</Button>
        <Button variant="outline" className="flex items-center gap-2 flex-grow md:flex-grow-0">
          <Heart className="h-4 w-4" />
          <span>Save</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2 flex-grow md:flex-grow-0">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      {/* Main content with tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 animate-fadeIn delay-200">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="services">Services & Pricing</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {funeralHome.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{funeralHome.description}</p>
                  <p>{funeralHome.about}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Facilities & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {funeralHome.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location & Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Address</h4>
                          <p className="text-muted-foreground">
                            {funeralHome.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Phone className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Phone</h4>
                          <p className="text-muted-foreground">
                            {funeralHome.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Mail className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Email</h4>
                          <p className="text-muted-foreground">
                            {funeralHome.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Globe className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Website</h4>
                          <a
                            href={funeralHome.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {funeralHome.website.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Hours</h4>
                          <p className="text-muted-foreground">
                            {funeralHome.hours}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-64 bg-secondary rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Map view placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Packages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {funeralHome.packages.map((pkg: ServicePackage, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                    >
                      <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-2">
                        ${pkg.price.toLocaleString()}
                      </p>
                      <p className="text-muted-foreground mb-4">{pkg.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Included Services:</h4>
                        {pkg.includedServices.map((service, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <svg
                              className="w-4 h-4 mr-2 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {service}
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full md:w-auto">Select This Package</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Additional Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {funeralHome.additionalServices.map((service, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b last:border-0"
                      >
                        <span>{service.name}</span>
                        <span className="font-semibold">
                          ${service.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="text-4xl font-bold mr-2">{funeralHome.rating}</div>
                        <div className="flex flex-col">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(funeralHome.rating)
                                    ? "fill-current"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Based on {funeralHome.reviewCount} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {funeralHome.reviews && funeralHome.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 transition-all duration-300 hover:shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{review.name}</h4>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-current" : "text-gray-300"
                                  }`}
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                </svg>
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="animate-fadeIn delay-300">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Get more information about services and pricing from {funeralHome.name}.
                </p>
                <Button className="w-full">Contact Now</Button>
                <p className="text-xs text-muted-foreground text-center">
                  They typically respond within 24 hours
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Basic Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Starting At
                  </p>
                  <p className="text-3xl font-semibold text-primary">
                    ${funeralHome.basicPrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Plus applicable taxes
                  </p>
                </div>
                
                <div className="space-y-2 mb-4">
                  {funeralHome.services.map((service, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {service}
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActiveTab("services")}
                >
                  View All Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuneralHomeDetails;
