'use client';
import React, { useState } from 'react';
import CardWrapper from './card-wrapper';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';

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
import { Login } from '@/actions/login';
import { useTransition } from 'react';
import Link from 'next/link';

const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : ""
	
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			Login(values).then((data) => {
				if(data?.error){
					form.reset();
					setError(data?.error);
				}
				if(data?.success){
					form.reset();
					setSuccess(data?.success);
				}
				if(data?.twoFactor){
					setShowTwoFactor(true);
				}
			})
			.catch(()=> 
				setError("Something went wrong!!!")
		);
		});
	};

	return (
		<CardWrapper
			headerLabel="Welcome back!"
			backButtonLabel="Don't have an account ?"
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Email */}
					<div className="space-y-4">
						{showTwoFactor && (
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
										<FormControl>
											<Input
												disabled={isPending}
												{...field}
												placeholder="123456"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													disabled={isPending}
													{...field}
													placeholder="john.doe@example.com"
													type="email"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Password */}
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
											<Button
												size={'sm'}
												variant={'link'}
												asChild
												className="px-0 font-normal"
											>
												<Link href="/auth/reset">Forgot Password</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					{error && <FormError message={error || urlError} />}
					{success && <FormSuccess message={success} />}
					<Button type="submit" className="w-full">
						{showTwoFactor ? "Confirm" : "Login"}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default LoginForm;
