'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {
	generateVerificationToken,
	generateTwoFactorToken,
} from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { db } from '@/lib/db';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import bcrypt from 'bcryptjs';

export const Login = async (values: z.infer<typeof LoginSchema>, callbackUrl?:string | null) => {
	const validatedFields = LoginSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Email does not exist' };
	}

	// Verify password
	const passwordsMatch = await bcrypt.compare(password, existingUser.password);
	if (!passwordsMatch) {
		return { error: 'Invalid credentials!' };
	}

	if (!existingUser?.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return { success: 'Confirmation email sent!' };
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
			if (!twoFactorToken) {
				return { error: 'Invalid code!'};
			}
			if (twoFactorToken.token !== code) {
				window.location.reload(); //! Find a replacement later
				return { error: 'Invalid code!', clearTwoFactorInput: true  };
			}
			const hasExpired = new Date(twoFactorToken.expires) < new Date();
			if (hasExpired) {
				return { error: 'Code expired!' };
			}
			await db.twoFactorToken.delete({
				where: { id: twoFactorToken.id },
			});

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				twoFactorToken.id
			);
			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				});
			}

			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
					email: existingUser.email,
				},
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
			return { twoFactor: true };
		}
	}
	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		console.log(error);

		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' };

				default:
					return { error: 'Something went wrong!' };
			}
		}
		throw error; //necessary to redirect
	}

	return { success: 'login successful!' };
};
