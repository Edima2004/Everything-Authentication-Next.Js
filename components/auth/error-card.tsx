import {Header} from "./header"
import  BackButton  from './back-button';
import {
   Card,
   CardFooter,
   CardHeader
} from "@/components/ui/card" 
import CardWrapper from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = ()=>{
   return(
      <CardWrapper
      headerLabel= "Oops! Something went wrong"
      backButtonHref= "/auth/login"
      backButtonLabel = "Back to login">
         <div className="w-full flex justify-center items-center">
            <ExclamationTriangleIcon className="text-destructive"/>

         </div>
         
      </CardWrapper>
   )
}
export default ErrorCard;