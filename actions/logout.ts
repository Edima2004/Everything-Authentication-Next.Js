'use server';

import { signOut } from '@/auth';


export const logOut = async () => {
	//Some server stuffs e.g updating a user
	await signOut();
};
