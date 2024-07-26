'use client';
import { logOut } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';

const SettingsPage = () => {
	const user = useCurrentUser();
	const onClick = () => {
		logOut();
	};

	return (
		<div className='bg-white p-10 rounded-xl'>
			{/*{JSON.stringify(user)}*/}
				<button
					type="submit"
					onClick={onClick}>
					Sign Out
				</button>
		</div>
	);
};

export default SettingsPage;
