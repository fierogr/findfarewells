
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FuneralHome } from "@/types/funeralHome";

interface DetailHeaderProps {
  funeralHome: FuneralHome;
}

const DetailHeader = ({ funeralHome }: DetailHeaderProps) => {
  return (
    <>
      <div className="flex items-center">
        <Link to="/search">
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
    </>
  );
};

export default DetailHeader;
