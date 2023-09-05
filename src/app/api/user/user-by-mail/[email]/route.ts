import prisma from '@/lib/db/prisma';
import { Msg } from '@/lib/utility/enums';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
	const { email } = params;
	const user = await prisma.user.findFirst({
		where: {
			email: email
		},
		select: { email: true, name: true, activated: true, id: true }
	});

	console.log(user);

	return NextResponse.json({ success: true, data: user, message: Msg.DATA_FETCH_SUCCESS });
}
