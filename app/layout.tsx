import React from 'react';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import {auth} from "@/auth"
import { Toaster } from '@/components/ui/sonner';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth()
	return (
	<SessionProvider session={session}>
		<html lang="en">
			<body>
				<Toaster/>
				{children}
			</body>
		</html>
	</SessionProvider>
	);
}
