'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function DashboardPage(): React.ReactElement {
	const session = useSession();

	return (
		<div>
			<h2>DashboardPage</h2>
			<div className="">{JSON.stringify(session)}</div>
			<button onClick={() => signOut({ callbackUrl: '/login' })} className="btn btn-primary">
				Logout
			</button>
		</div>
	);
}
