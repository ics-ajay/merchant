"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import { login } from "@/src/actions/login";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [state, action, isPending] = useActionState(login, {
    success: false,
    errors: {},
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto bg-white rounded-lg shadow-md border-slate-300">
        <div className="flex flex-wrap items-center">
          {/* LEFT SIDE */}
          <div className="hidden xl:flex xl:w-1/2 flex-col items-center justify-center py-20 gap-10">
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

          {/* RIGHT SIDE */}
          <div className="w-full xl:w-1/2 border-l p-8 sm:p-14">
            <h2 className="mb-8 text-2xl font-bold">Sign In to Merchant</h2>

            <form action={action}>
              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block font-medium">Email</label>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    defaultValue={state?.values?.email ?? ""}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-200 bg-white py-4 pl-6 pr-10 text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:text-gray-900"
                  />
                  {state.errors?.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {state.errors.email}
                    </p>
                  )}
                  <span className="absolute right-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition">
                    <TfiEmail />
                  </span>
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="mb-2 block font-medium">Password</label>

                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="6+ characters"
                    className="w-full rounded-lg border border-gray-200 bg-white py-4 pl-6 pr-10 text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:text-gray-900"
                  />
                  {state.errors?.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {state.errors.password}
                    </p>
                  )}
                  <span
                    className="absolute right-4 top-4 cursor-pointer text-gray-400 group-focus-within:text-blue-500 transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <p className="mt-6 text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
