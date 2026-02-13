"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/src/lib/api";

export async function togglePlaceActive(id: string, isActive: boolean) {
  await api.patch(`/hotspot/${id}`, {
    isActive: !isActive,
    hotspotType: "place",
  });

  revalidatePath("/places");
}
