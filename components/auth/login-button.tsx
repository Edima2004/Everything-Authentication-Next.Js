'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: 'model' | 'redirect';
	asChild?: boolean;
}
const LoginButton = ({
	children,
	mode = 'redirect',
	asChild,
}: LoginButtonProps) => {

   const router = useRouter();
   const onClick = ()=>{
      router.push("/auth/login")
      
   }

   if(mode === 'model'){
      return (
         <span>TODO: implement modal</span>
      )
   }


	return (<span onClick = {onClick} className="cursor-pointer">{children}</span>);
};

export default LoginButton;
