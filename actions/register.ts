'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail, getUserById } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
	console.log(values); //server console

	const validatedFields = RegisterSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const {name, email, password} = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);
	
	const existingUser = await getUserByEmail(email);
	//const existingUser2 = await getUserById(id);
	
		if (existingUser) {
			return {error: "Email already in use!"}
		}

		await db.user.create({
			data:{
				name,
				email,
				password:hashedPassword,
			},
		});

		const verificationToken = await generateVerificationToken(email)

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);
			return { success: 'Confirmation email sent!' };
};
