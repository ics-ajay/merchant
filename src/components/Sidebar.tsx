"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Places", path: "/dashboard/places" },
  { name: "Place Offers", path: "/dashboard/place-offers" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Merchant</h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                px-4 py-2 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
