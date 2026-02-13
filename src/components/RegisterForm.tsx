"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/src/actions/register";

import { FiUser, FiBriefcase, FiFile, FiEye, FiEyeOff } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [state, action, isLoading] = useActionState(registerUser, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state.success) {
      router.push("/login");
    }
  }, [state.success, router]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap items-center">
          {/* LEFT */}
          <div className="hidden xl:flex xl:w-1/2 flex-col items-center justify-center py-20 gap-10 border-r border-slate-300">
            <Image
              src="/logo/logoPurple.svg"
              alt="Logo"
              width={90}
              height={90}
            />
            <Image
              src="/cover/Frame.svg"
              alt="Illustration"
              width={400}
              height={400}
            />
          </div>

          {/* RIGHT */}
          <div className="w-full xl:w-1/2 p-6">
            <h2 className="mb-8 text-2xl font-bold">Create Merchant Account</h2>

            <form action={action} className="space-y-5">
              {/* Company Name */}
              <div className="relative">
                <FiBriefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="companyName"
                  defaultValue={state.values?.companyName ?? ""}
                  placeholder="Business Name"
                  className="w-full rounded-lg border p-4 pr-12"
                />
                {state.errors?.companyName && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.errors.companyName}
                  </p>
                )}
              </div>

              {/* Contact Person */}
              <div className="relative">
                <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="contactPerson"
                  defaultValue={state.values?.contactPerson ?? ""}
                  placeholder="Full Name"
                  className="w-full rounded-lg border p-4 pr-12"
                />
                {state.errors?.contactPerson && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.errors.contactPerson}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <TfiEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  defaultValue={state.values?.email ?? ""}
                  placeholder="Email"
                  className="w-full rounded-lg border p-4 pr-12"
                />
                {state.errors?.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full rounded-lg border p-4 pr-12"
                />
                {state.errors?.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.errors.password}
                  </p>
                )}
              </div>

              {/* Documents */}
              <div className="relative">
                <FiFile className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="file"
                  name="documents"
                  className="w-full rounded-lg border p-4 pr-12"
                />
                {state.errors?.documents && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.errors.documents}
                  </p>
                )}
              </div>

              <button
                disabled={isLoading}
                className="w-full bg-blue-600 text-white p-4 rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
