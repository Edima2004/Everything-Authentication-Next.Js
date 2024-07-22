'use client';
import React, { useState } from 'react';
import CardWrapper from './card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { NewPasswordSchema } from '@/schemas';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/actions/new-password';

const NewPasswordForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const [isPending, startTransition] = useTransition();
   const searchParams = useSearchParams();
   const token = searchParams.get("token");


	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError('');
		setSuccess('');
		console.log(values);

		startTransition(() => {
			newPassword(values, token).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};

	return (
		<CardWrapper
			headerLabel="Enter a new password?"
			backButtonLabel="Back to login"
			backButtonHref="/auth/signin"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Email */}
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder="******"
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{error && <FormError message={error} />}
					{success && <FormSuccess message={success} />}
					<Button type="submit" className="w-full" disabled={isPending}>
						Reset Password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default NewPasswordForm;
