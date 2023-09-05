'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function RegisterPage(): React.ReactElement {
	const router = useRouter();
	const [user, setUser] = useState({ email: '', password: '', username: '' });
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const payload = {
			email: formData.get('email'),
			password: formData.get('password'),
			name: formData.get('name')
		};

		const res = await fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
		if (!res.ok) {
			toast.error('Failed to register');
			throw new Error('Failed to register');
		}
		const data = await res.json();
		console.log(data);

		if (data.success) {
			toast.success(data.message);
			// redirect to login
			router.replace('/login');
		}
	};

	return (
		<>
			<div className="">
				<form
					className="w-96 mx-auto mt-40 p-10 border border-gray-200 rounded-lg shadow-lg"
					onSubmit={handleRegister}>
					<div>
						<label htmlFor="name" className="label label-text">
							Name
						</label>
						<input
							type="text"
							name="name"
							placeholder="Full Name"
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div>
						<label htmlFor="email" className="label label-text">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div>
						<label htmlFor="email" className="label label-text">
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="**********"
							className="input input-bordered w-full"
							required
						/>
					</div>
					<p className="text-center">
						<button type="submit" className="mt-5 btn btn-block btn-outline btn-primary">
							Register
						</button>
					</p>
				</form>
			</div>
		</>
	);
}
