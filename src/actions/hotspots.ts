"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { api } from "@/src/lib/api";

export async function togglePlaceActive(id: string, isActive: boolean) {
  await api.patch(`/hotspot/${id}`, {
    isActive: !isActive,
    hotspotType: "place",
  });

  revalidatePath("/places");
}

const daySchema = z.object({
  day: z.string(),
  open: z.string().optional(),
  close: z.string().optional(),
  enabled: z.boolean(),
});

const placeSchema = z.object({
  neighborhood: z.string().min(1, "Neighborhood required"),
  placeCategory: z.string().optional(),
  foodCategory: z.string().optional(),
  priceRange: z.string().optional(),
  vibeType: z.string().optional(),
  placeDetails: z.string().min(1, "Details required"),
  image: z.instanceof(File).optional(),
  hotspotType: z.literal("place"),
  googleLocationName: z.string().min(1, "Location required"),
  googlePlaceId: z.string().min(1),
  googleLatitude: z.string().min(1),
  googleLongitude: z.string().min(1),
  googlePlaceAddress: z.string().optional(),
  placeOpeningHours: z.array(daySchema),
});

export type CreatePlaceState = {
  success: boolean;
  errors?: {
    neighborhood?: string;
    placeDetails?: string;
    image?: string;
    server?: string;
  };
  values?: {
    neighborhood?: string;
    placeCategory?: string;
    foodCategory?: string;
    placeDetails?: string;
    priceRange?: string;
    vibeType?: string;
    googleLocationName?: string | null;
    googlePlaceId?: string | null;
    googleLatitude?: string | null;
    googleLongitude?: string | null;
    googlePlaceAddress?: string | null;
  };
};

export async function createPlace(
  prevState: CreatePlaceState,
  formData: FormData,
): Promise<CreatePlaceState> {
  try {
    // ✅ extract form values
    const rawData = {
      neighborhood: formData.get("neighborhood"),
      placeCategory: formData.get("placeCategory"),
      foodCategory: formData.get("foodCategory"),
      placeDetails: formData.get("placeDetails"),
      priceRange: formData.get("priceRange"),
      vibeType: formData.get("vibeType"),
      image: formData.get("image"),
      hotspotType: "place",
      googleLocationName: formData.get("googleLocationName"),
      googlePlaceId: formData.get("googlePlaceId"),
      googleLatitude: formData.get("googleLatitude"),
      googleLongitude: formData.get("googleLongitude"),
      googlePlaceAddress: formData.get("googlePlaceAddress"),
      placeOpeningHours: JSON.parse(
        (formData.get("placeOpeningHours") as string) || "[]",
      ),
    };

    console.log("RAW DATA:", rawData);

    // ✅ validate
    const parsed = placeSchema.safeParse(rawData);
    console.log(">>>>>>>>>>>>>>>>>>", parsed);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;

      return {
        success: false,
        errors: {
          neighborhood: errors.neighborhood?.[0],
          placeDetails: errors.placeDetails?.[0],
          image: errors.image?.[0],
        },
        values: {
          neighborhood: rawData.neighborhood as string,
          placeCategory: rawData.placeCategory as string,
          foodCategory: rawData.foodCategory as string,
          placeDetails: rawData.placeDetails as string,
          priceRange: formData.get("priceRange") as string,
          vibeType: formData.get("vibeType") as string,
          googleLocationName: formData.get("googleLocationName") as string,
          googlePlaceId: formData.get("googlePlaceId") as string,
          googleLatitude: formData.get("googleLatitude") as string,
          googleLongitude: formData.get("googleLongitude") as string,
          googlePlaceAddress: formData.get("googlePlaceAddress") as string,
        },
      };
    }

    const data = parsed.data;

    console.log("VALID DATA:", data);

    const apiFormData = new FormData();

    apiFormData.append("neighborhoodId", data.neighborhood);
    apiFormData.append("hotspotType", "place");
    apiFormData.append("googleLocationName", data.googleLocationName);
    apiFormData.append("googlePlaceId", data.googlePlaceId);
    apiFormData.append("googleLatitude", data.googleLatitude);
    apiFormData.append("googleLongitude", data.googleLongitude);

    if (data.googlePlaceAddress) {
      apiFormData.append("googlePlaceAddress", data.googlePlaceAddress);
    }
    if (data.placeCategory)
      apiFormData.append("placeCategory", data.placeCategory);
    if (data.foodCategory)
      apiFormData.append("foodCategory", data.foodCategory);
    apiFormData.append("placeDetails", data.placeDetails);
    if (data.priceRange) apiFormData.append("priceRange", data.priceRange);
    if (data.vibeType) apiFormData.append("vibeType", data.vibeType);
    apiFormData.append(
      "placeOpeningHours",
      JSON.stringify(data.placeOpeningHours),
    );

    apiFormData.append("image", data.image);

    const response = await fetch("http://localhost:3001/api/hotspot", {
      method: "POST",
      body: apiFormData,
    });

    if (!response.ok) {
      const text = await response.text();

      console.log("API ERROR:", text);

      return {
        success: false,
        errors: { server: "Failed to create place" },
      };
    }

    console.log("✅ Place created successfully", response);
    alert("Place created successfully");
    revalidatePath("/places");

    return { success: true };
  } catch (err) {
    console.error("SERVER ACTION ERROR:", err);

    return {
      success: false,
      errors: { server: "Something went wrong" },
    };
  }
}
