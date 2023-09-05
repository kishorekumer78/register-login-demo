'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function VerifyMailPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const router = useRouter();
	const [text, setText] = useState('');

	useEffect(() => {
		(async () => {
			const res = await fetch(`/api/verifyMail?token=${token}`);
			if (!res.ok) {
				throw new Error('Failed to verify email');
			}
			const data = await res.json();
			if (data.success) {
				router.replace('/login');
			} else {
				setText('Verification Failed');
			}
		})();
	});
	return <div>{text}</div>;
}
