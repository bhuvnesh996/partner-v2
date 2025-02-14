import { NextRequest, NextResponse } from "next/server";

const routes = {
  public: ["/", "/signup", "/confirm-account", "forgot-password", "reset-password", "/verify-mfa"],
  protected: ["/home", "/sessions", "/wallet", "/course"],
  verticals: {
    online: {
      routes: [
        "/online",
        "/online/leads",
        "/online/admission",
        "/online/course",
        "/online/university"
      ]
    },
    regular: {
      routes: [
        "/regular",
        "/regular/admissions",
        "/regular/course",
        "/regular/university"
      ]
    },
    distance: {
      routes: [
        "/distance",
        "/distance/admission",
        "/distance/course",
        "/distance/university"
      ]
    },
    common: [
      "/commission",
      "/promotional",
      "/settings",
      "/wallet"
    ]
  }
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const accessToken = req.cookies.get("accessToken")?.value;
  const selectedUniversity = req.cookies.get("selectedUniversity")?.value;
  
  // Parse selected university data if it exists
  let universityData = null;
  try {
    universityData = selectedUniversity ? JSON.parse(selectedUniversity) : null;
  } catch (e) {
    console.error("Error parsing selectedUniversity cookie:", e);
  }

  // Handle public routes
  if (routes.public.includes(path)) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
    return NextResponse.next();
  }

  // Require authentication for all other routes
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Handle vertical-specific routes
  if (path.startsWith('/online') || path.startsWith('/regular') || path.startsWith('/distance')) {
    const vertical = path.split('/')[1].toUpperCase(); // Convert to uppercase to match your vertical names

    // If no university is selected, redirect to home
    if (!universityData) {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }

    // If trying to access a different vertical's routes
    if (vertical !== universityData.vertical) {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
  }

  // Allow access to common routes regardless of selected vertical
  if (routes.verticals.common.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Allow access to protected routes when no vertical is selected
  if (routes.protected.includes(path)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public/*)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};