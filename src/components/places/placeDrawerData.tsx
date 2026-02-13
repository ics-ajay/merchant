// import { api } from "@/src/lib/api";
// import {
//   FoodCategoryResponse,
//   NeighborhoodResponse,
//   PlaceCategoryResponse,
//   PriceRangeResponse,
//   VibeTypeResponse,
// } from "@/src/types/places";
// import PlaceDrawer from "./placeDrawer";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// export default async function PlaceDrawerData({ open, onClose }: Props) {
//   if (!open) return null;
//   const [
//     placeCategories,
//     foodCategories,
//     vibeTypes,
//     neighborhoods,
//     priceRange,
//   ] = await Promise.all([
//     api
//       .get<PlaceCategoryResponse>("/place-category?isActive=true")
//       .catch(() => ({ result: { data: [] } })),
//     api
//       .get<FoodCategoryResponse>("/food-category?isActive=true")
//       .catch(() => ({ result: { data: [] } })),
//     api
//       .get<VibeTypeResponse>("/vibe-type")
//       .catch(() => ({ result: { data: [] } })),
//     api
//       .get<NeighborhoodResponse>("/neighbor?isActive=true")
//       .catch(() => ({ result: { data: [] } })),
//     api
//       .get<PriceRangeResponse>("/price-range?isActive=true")
//       .catch(() => ({ result: { data: [] } })),
//   ]);

//   return (
//     <PlaceDrawer
//       open={open}
//       onClose={onClose}
//       foodCategories={foodCategories?.result?.data}
//       neighbourhoods={neighborhoods?.result?.data}
//       placeCategories={placeCategories?.result?.data}
//       priceRange={priceRange?.result?.data}
//       vibeTypes={vibeTypes?.result?.data}
//     />
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import {
  FoodCategoryResponse,
  NeighborhoodResponse,
  PlaceCategoryResponse,
  PriceRangeResponse,
  VibeTypeResponse,
} from "@/src/types/places";
import PlaceDrawer from "./placeDrawer";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PlaceDrawerData({ open, onClose }: Props) {
  const [placeCategories, setPlaceCategories] = useState<any[]>([]);
  const [foodCategories, setFoodCategories] = useState<any[]>([]);
  const [vibeTypes, setVibeTypes] = useState<any[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch when drawer opens
    if (!open) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          placeCategoriesRes,
          foodCategoriesRes,
          vibeTypesRes,
          neighborhoodsRes,
          priceRangeRes,
        ] = await Promise.all([
          api
            .get<PlaceCategoryResponse>("/place-category?isActive=true")
            .catch(() => ({ result: { data: [] } })),
          api
            .get<FoodCategoryResponse>("/food-category?isActive=true")
            .catch(() => ({ result: { data: [] } })),
          api
            .get<VibeTypeResponse>("/vibe-type")
            .catch(() => ({ result: { data: [] } })),
          api
            .get<NeighborhoodResponse>("/neighbor?isActive=true")
            .catch(() => ({ result: { data: [] } })),
          api
            .get<PriceRangeResponse>("/price-range?isActive=true")
            .catch(() => ({ result: { data: [] } })),
        ]);

        setPlaceCategories(placeCategoriesRes?.result?.data || []);
        setFoodCategories(foodCategoriesRes?.result?.data || []);
        setVibeTypes(vibeTypesRes?.result?.data || []);
        setNeighborhoods(neighborhoodsRes?.result?.data || []);
        setPriceRange(priceRangeRes?.result?.data || []);
      } catch (err) {
        console.error("Failed to fetch drawer data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open]);

  // Don't render if closed
  if (!open) return null;

  // Optional loading UI
  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <PlaceDrawer
      open={open}
      onClose={onClose}
      foodCategories={foodCategories}
      neighbourhoods={neighborhoods}
      placeCategories={placeCategories}
      priceRange={priceRange}
      vibeTypes={vibeTypes}
    />
  );
}
