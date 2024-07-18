'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: 'Token does not exist!' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
	}
};
