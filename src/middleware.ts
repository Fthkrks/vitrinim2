import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// /admin, /preview, /create rotalarını koruyalım, / kök dizinini hariç tutalım
const isProtectedRoute = createRouteMatcher(["/admin", "/preview", "/create", "/payment"]);
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

// Bu ayar middleware'in Edge Runtime yerine Node.js ortamında çalışmasını sağlar
export const config = {
  runtime: 'nodejs',  // Node.js ortamında çalışmasını sağlıyoruz
  matcher: [
    // Next.js internal dosyaları ve statik dosyaları atla
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Her zaman API rotaları için çalıştır
    "/api/(.*)",
  ],
};
