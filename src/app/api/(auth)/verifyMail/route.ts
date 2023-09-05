import prisma from '@/lib/db/prisma';
import { Msg } from '@/lib/utility/enums';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const token = searchParams.get('token');

	const user = await prisma.user.findFirst({
		where: { emailVerificationToken: token },
		select: { id: true, name: true, email: true }
	});

	if (user) {
		await prisma.user.update({
			where: { id: user.id },
			data: { activated: true, emailVerificationToken: null }
		});
		return NextResponse.json({ success: true, message: Msg.DATA_FETCH_SUCCESS, data: user });
	} else {
		return NextResponse.json({ success: false, message: Msg.DATA_FETCH_FAIL });
	}
}
