import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";

export async function middleware(request: NextRequest) {
    const session = request.cookies.get("session")?.value;

    if (request.nextUrl.pathname.startsWith("/admin")) {
        // If it's the login page, let them through
        if (request.nextUrl.pathname === "/admin/login") {
            if (session) {
                try {
                    await decrypt(session);
                    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
                } catch (e) {
                    // Invalid session, let them stay on login
                }
            }
            return NextResponse.next();
        }

        // Require session for all other /admin routes
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            await decrypt(session);
            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
