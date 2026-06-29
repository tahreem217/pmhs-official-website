import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routerAccessMap } from './lib/setting'
import { NextResponse } from 'next/server'

const matchers = Object.keys(routerAccessMap).map(route => ({
    matcher: createRouteMatcher([route]),
    allowedRoles: routerAccessMap[route],
}))

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as {role?:string })?.role;
    const currentPath = req.nextUrl.pathname;

    // 1. Check if the user is trying to access a protected route
    for (const { matcher, allowedRoles } of matchers) {
        if (matcher(req)) {
            
            // FIX 1: Only redirect to sign-in IF they are trying to view a protected page
            if (!userId) {
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }

            // FIX 2: If they are logged in but have the WRONG role
            if (!allowedRoles.includes(role || "")) {
                const fallback = role === "admin" ? `/${role}` : `/${role}/${userId}`;
                
                // Safety check to prevent infinite loops if they are already on the fallback path
                if (currentPath !== fallback) {
                    return NextResponse.redirect(new URL(fallback, req.url));
                }
            }
        }
    }

    // FIX 3: THE BOUNCER. 
    // If a student or teacher lands EXACTLY on `/student` or `/teacher`, 
    // instantly push them to their personalized ID route.
    if (userId && role && role !== "admin") {
        if (currentPath === `/${role}`) {
            return NextResponse.redirect(new URL(`/${role}/${userId}`, req.url));
        }
    }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};