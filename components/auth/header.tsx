import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import React from 'react';

const font = Poppins({
	weight: ['600'],
	subsets: ['latin'],
});

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className="w-full flex flex-col gap-y-4 items-center justify-center">
			<h1 className="text-3xl font-semibold">Auth</h1>
			<p className="text-muted-foreground text-sm">{label}</p>
		</div>
	);
};
