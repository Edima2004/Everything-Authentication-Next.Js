//Array of accessible routes
export const publicRoutes = [
   "/",
   "/auth/new-verification"
]

//Array of authenticated routes
//redirect logged in users to /settings
export const authRoutes = [

   "/auth/login",
   "/auth/register",
   "/auth/error"
]

//prefix for API authentication routes
export const apiAuthPrefix = "/api/auth";

//default to redirect route
export const DEFAULT_LOGIN_REDIRECT = "/settings";
