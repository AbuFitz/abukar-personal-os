import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.get("sb-access-token");
  const isPublic = req.nextUrl.pathname.startsWith("/auth");
  if (!isAuth && !isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next|favicon.ico|images|public).*)"] };
