'use client';
import { UserInfo } from '@/components/auth/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';

const ClientPage = () => {
	const user = useCurrentUser();
	return (
		<div className="w-11/12">
			<UserInfo label="Client component" user={user} />
		</div>
	);
};

export default ClientPage;
