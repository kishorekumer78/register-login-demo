'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LoginPage(): React.ReactElement {
	const router = useRouter();
	// const [user, setUser] = useState({ email: '', password: '', username: '' });
	// const [buttonDisabled, setButtonDisabled] = useState(true);
	// const [loading, setLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const payload = {
			email: formData.get('email'),
			password: formData.get('password')
		};

		// const res = await fetch('/api/login', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(payload)
		// });
		// if (!res.ok) {
		// 	// toast unsuccessful login
		// }
		// const data = await res.json();
		// redirect to dashboard
		const res = await signIn('credentials', {
			redirect: false,
			email: payload.email,
			password: payload.password,
			callbackUrl: '/dashboard'
		});
		if (!res?.error) {
			router.replace('/dashboard');
		}
	};

	return (
		<>
			<div className="">
				<form
					className="w-96 mx-auto mt-40 p-10 border border-gray-200 rounded-lg shadow-lg"
					onSubmit={handleLogin}>
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
							Login
						</button>
					</p>
				</form>
			</div>
		</>
	);
}
