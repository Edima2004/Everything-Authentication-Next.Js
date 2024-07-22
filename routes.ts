//Array of accessible routes
//for both logged in and logged out users
export const publicRoutes = [
   "/",
   "/auth/new-verification",
]

//Array of authenticated routes
//redirect logged in users to /settings
//For only logged out users 
export const authRoutes = [
	'/auth/login',
	'/auth/register',
	'/auth/error',
	'/auth/reset',
	'/auth/new-password',
];

//prefix for API authentication routes
export const apiAuthPrefix = "/api/auth";

//default to redirect route
export const DEFAULT_LOGIN_REDIRECT = "/settings";
