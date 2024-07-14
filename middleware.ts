import authConfig from './auth.config';
import NextAuth from 'next-auth';
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
} from '@/routes';
import { NextAuthRequest } from 'next-auth/lib';

const { auth } = NextAuth(authConfig);
export default auth ((req) => {
   //console.log(req);
   const {nextUrl} = req;
   const isLoggedIn = !!req.auth

   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
   
   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

   if(isApiAuthRoute){
      return null
   }
   if(isAuthRoute){
      
      if(isLoggedIn){
         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      return null
   }

   if(!isLoggedIn && !isPublicRoute){
      return Response.redirect(new URL("/auth/login", nextUrl))
   }
   return null

	//const isLoggedIn = !!req.auth;
	//console.log('ROUTE: ', req.nextUrl.pathname);
	//console.log('IS LOGGED IN: ', isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
