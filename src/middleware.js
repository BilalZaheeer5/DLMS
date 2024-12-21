import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function middleware(request) {
  const Secret_Key = "932jKLD((@)@*@3984"; // Secret key for encryption
  const coo = (await cookies()).get("_JKW32JD");

  // Check if the current path is /login to avoid redirection loop
  const isLoginPage = request.nextUrl.pathname === "/login";
  
  // If the user is on the login page and already authenticated, redirect to /admin
  if (isLoginPage && coo) {
    const data = CryptoJS.AES.decrypt(coo.value, Secret_Key).toString(CryptoJS.enc.Utf8);
    if (data) {
      // If the user is authenticated, redirect to /admin
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // If the user is not authenticated and trying to access /admin, redirect to /login
  if (!coo || !CryptoJS.AES.decrypt(coo.value, Secret_Key).toString(CryptoJS.enc.Utf8)) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the user is authenticated and accessing /admin, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
