"use client";

import { IoClose } from "react-icons/io5";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PlaceOfferModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Right Drawer */}
      <div className="absolute right-0 top-0 h-screen w-[450px] bg-white shadow-xl flex flex-col animate-slideIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold">Place Offer</h2>
          <button onClick={onClose}>
            <IoClose size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <form className="space-y-4">
            {/* Place */}
            <div>
              <label className="block mb-2 font-medium">Place</label>
              <select className="w-full border border-slate-200 rounded-lg px-4 py-3">
                <option>Select Place</option>
                <option>Delhi Mall</option>
                <option>City Center</option>
              </select>
            </div>

            {/* Redeem Code */}
            <div>
              <label className="block mb-2 font-medium">Redeem Code</label>
              <input
                type="text"
                placeholder="Enter redeem code"
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                placeholder="Enter description"
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block mb-2 font-medium">Expiry Date</label>
              <input
                type="date"
                className="w-full border border-slate-200 rounded-lg px-4 py-3"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
