"use client";

import { togglePlaceActive } from "@/src/actions/hotspots";
import { useOptimistic, useTransition } from "react";

export default function Switch({
  isActive = false,
  id,
}: {
  isActive?: boolean;
  id: string;
}) {
  const [pending, startTransition] = useTransition();

  const [optimisticActive, setOptimisticActive] = useOptimistic(
    isActive,
    (current) => !current,
  );

  const handlePlaceActiveSwitch = () => {
    startTransition(async () => {
      setOptimisticActive(null);
      await togglePlaceActive(id, optimisticActive);
    });
  };

  return (
    <button
      disabled={pending}
      onClick={handlePlaceActiveSwitch}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
        optimisticActive ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
          optimisticActive ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
}
