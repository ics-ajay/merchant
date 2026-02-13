// import { NextResponse } from "next/server";

// export async function GET() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
//     credentials: "include",
//   });

//   if (!res.ok) {
//     return NextResponse.json({ authenticated: false }, { status: 401 });
//   }

//   const user = await res.json();
//   return NextResponse.json({ authenticated: true, user });
// }
