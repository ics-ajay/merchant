"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* Your animation */}
        <div className="animate-fadeScale">
          <Image src="/logo/logoPurple.svg" alt="logo" width={80} height={80} />
        </div>
      </div>
    </div>
  );
}
