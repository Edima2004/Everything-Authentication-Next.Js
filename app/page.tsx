import React from 'react';
import { Button} from '@/components/ui/button';
import LoginButton from '@/components/auth/login-button';

function Home() {
	return (
		<main className="flex flex-col h-full justify-center align-middle text-center px-2rem py-1rem border-s-violet-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 font-mono">
			<div className="space-y-6">
				<h1 className="text-6xl font-semibold text-white drop-shadow-md">
					Auth
				</h1>
				<p className="text-white text-lg">A simple authentication service</p>
				<div>
					<LoginButton>
						<Button
							type="submit"
							className="px-5 py-3 bg-white font-bold rounded-lg text-black"
						>
							Sign in
						</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	);
}

export default Home;
