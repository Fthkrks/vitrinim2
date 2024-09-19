import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export const config = { matcher: '/((?!_next).*)' };

// /admin, /preview, /create rotalarını koruyalım, / kök dizinini hariç tutalım
const isProtectedRoute = createRouteMatcher(["", "/preview", "/create", "/payment"]);
const isRootPath = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  if (isProtectedRoute(req)) {
    auth().protect();  // Korunan rotalara girilmek istendiğinde auth() tetiklenir
  }

  if (isRootPath(req) && userId) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

