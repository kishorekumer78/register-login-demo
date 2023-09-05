import prisma from '@/lib/db/prisma';
import bcryptjs from 'bcryptjs';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const { email, password } = await request.json();

	const user = await prisma.user.findFirst({
		where: { email },
		select: { id: true, name: true, email: true, activated: true, password: true }
	});

	if (!user) {
		return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
	}

	const isValid = await bcryptjs.compare(password, user.password);
	if (!isValid) {
		return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
	}
}
