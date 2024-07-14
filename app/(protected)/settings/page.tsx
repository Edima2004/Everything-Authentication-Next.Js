import { auth, signOut } from '@/auth';

const SettingsPage = async () => {
	const session = await auth();
	
	return (
		<div>
			{/*Settings Page*/}
			{JSON.stringify(session)}
			<form
				action={async () => {
					'use server';
					await signOut();
				}}
			>
				<button
					type="submit"
					className="p-3 text-white bg-gray-700 rounded-full"
				>
					Sign Out
				</button>
			</form>
		</div>
	);
};

export default SettingsPage;
