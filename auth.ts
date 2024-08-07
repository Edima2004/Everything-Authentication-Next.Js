import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from './lib/db';
import { getUserById } from './data/user';
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';
import { getAccountByUserId } from './data/account';

export type ExtendedUser = DefaultSession['user'] & {
	role: 'ADMIN' | 'USER';
	isTwoFactorEnabled: boolean;
	isOAuth: boolean;
};

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},

	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		//async signIn({ user, account, profile, email, credentials }) {
		//console.log(user);

		//	const existingUser = await getUserById(user.id ?? '');

		//	if(!existingUser || !existingUser.emailVerified){
		//		return false
		//	}
		//	return true;
		//},
		async signIn({ user, account }) {
			// Allow OAuth without email verification
			if (account?.type !== 'credentials') return true;

			if (user.id) {
				const existingUser = await getUserById(user.id);
				//prevent signin without email verification
				if (!existingUser?.emailVerified) return false;

				if (existingUser.isTwoFactorEnabled) {
					const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
						existingUser.id
					);

					if (!twoFactorConfirmation) return false;
					//Delete two factor confirmation for next sign in

					await db.twoFactorConfirmation.delete({
						where: {
							id: twoFactorConfirmation?.id,
						},
					});
				}
			}

			return true;
		},
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (token.role && session.user) {
				session.user.role = token.role as 'ADMIN' | 'USER';
			}
			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email || '';
				session.user.isOAuth =token.isOAuth as boolean;

				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
			}
			return session;
		},

		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;

			const existingAccount = await getAccountByUserId(existingUser.id)

			token.isOAuth = !!existingAccount;//now a boolean
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.role = existingUser.role;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
			//console.log('JWT: ', token);
			return token;
		},
	},

	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
});
