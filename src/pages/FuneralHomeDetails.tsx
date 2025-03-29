
import React from "react";
import { useParams } from "react-router-dom";
import { useFuneralHome } from "@/hooks/useFuneralHome";
import { getStarRating } from "@/helpers/ratingHelpers";
import { 
  DetailHeader, 
  BasicInfoCard, 
  DetailTabs, 
  PackagesList, 
  AdditionalServicesList,
  LoadingState,
  ErrorState
} from "@/components/funeral-home-details";

const FuneralHomeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: funeralHome, isLoading, error } = useFuneralHome(id as string);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !funeralHome) {
    return <ErrorState />;
  }

  return (
    <div className="container py-8 space-y-6">
      <DetailHeader funeralHome={funeralHome} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BasicInfoCard funeralHome={funeralHome} getStarRating={getStarRating} />
          <DetailTabs funeralHome={funeralHome} getStarRating={getStarRating} />
        </div>

        <div className="space-y-6">
          <PackagesList funeralHome={funeralHome} />
          <AdditionalServicesList funeralHome={funeralHome} />
        </div>
      </div>
    </div>
  );
};

export default FuneralHomeDetails;
