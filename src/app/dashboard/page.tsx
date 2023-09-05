'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function DashboardPage(): React.ReactElement {
	const session = useSession();
	const [user, setUser] = useState<any>();

	useEffect(() => {
		(async () => {
			if (session.data?.user?.email) {
				const res = await fetch(`/api/user/user-by-mail/${session.data?.user?.email}`);
				if (!res.ok) {
					throw new Error('Failed to fetch user');
				}
				const data = await res.json();
				if (data.success) {
					setUser(data.data);
				}
			}
		})();
	}, [session]);

	return (
		<div>
			<h2>DashboardPage</h2>
			<p>{user?.activated ? '' : 'Please activate your mail to use dashboard fully'}</p>
		</div>
	);
}
