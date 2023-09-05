'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function Navbar() {
	const session = useSession();
	const { data } = session;
	return (
		<>
			<div className="navbar shadow-2xl rounded-lg justify-end">
				<span>{data?.user?.name}</span>
				<Link href="/register" className="btn btn-ghost  ">
					Register
				</Link>
				{data?.user ? (
					<button className="btn btn-ghost " onClick={() => signOut({ callbackUrl: '/login' })}>
						Logout
					</button>
				) : (
					<Link href="/login" className="btn btn-ghost ">
						Login
					</Link>
				)}
			</div>
		</>
	);
}
