"use server"
import {useSession}  from "next-auth/react"

export const useCurrentUser = ()=>{
   const session = useSession().data?.user;

   return session;
}
