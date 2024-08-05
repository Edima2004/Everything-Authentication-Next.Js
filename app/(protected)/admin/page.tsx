"use client"

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
//import { currentRole } from "@/lib/auth";

const AdminPage = async()=>{
   const onApiRouteClick = ()=>{
      fetch("/api/admin")
      .then((response)=>{
         if(response.ok){
            console.log("OKAY");
         }
         else{
            console.error("FORBIDDEN");
         }
      })
   }
   //const role = await currentRole() *use server*
   return(
      <Card className="w-11/12">
         <CardHeader>
         <p className="text-2xl font-semibold text-center">
            Admin
         </p>
         </CardHeader>
         <CardContent className="space-y-4">
            <RoleGate allowedRole="ADMIN">
               <FormSuccess message="You are allowed to view this content!"/>
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
               <p className="text-sm font-medium">
                  Admin-only API Route
               </p>
               <Button
               onClick={onApiRouteClick}>
                  Click to test
               </Button>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
               <p className="text-sm font-medium">
                  Admin-only Server Action
               </p>
               <Button>
                  Click to test
               </Button>
            </div>
         </CardContent>
      </Card>
   )
}

export default AdminPage;