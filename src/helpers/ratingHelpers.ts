
import { Star } from "lucide-react";
import React from "react";

export const getStarRating = (rating: number) => {
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
