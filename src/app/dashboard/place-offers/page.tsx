"use client";

import PlaceOfferModal from "@/src/components/placeOffers/PlaceOfferModal";
import PlaceOfferTable from "@/src/components/placeOffers/PlaceOfferTable";
import { useState } from "react";

export default function PlaceOfferPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Place Offers</h1>

        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add New Place Offer
        </button>
      </div>

      {/* Table */}
      <PlaceOfferTable />

      {/* Modal */}
      <PlaceOfferModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
