import prisma from '@/lib/db/prisma';
import { sendMail } from '@/lib/utility/misc/mail';
import { ResponseType } from '@/lib/utility/types';
import { Prisma } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest): Promise<NextResponse<ResponseType>> {
	const reqBody: Prisma.UserCreateInput = await request.json();

	// check email exists
	const user = await prisma.user.findUnique({
		where: {
			email: reqBody.email
		}
	});
	if (user) {
		return NextResponse.json({ success: false, message: 'Email already exists' });
	}
	// generate hash password
	const hashedPassword = await bcryptjs.hash(reqBody.password, 10);
	const emailVerificationToken = await bcryptjs.hash(process.env.EMAIL_TOKEN_SECRET!, 10);
	const result = await prisma.user.create({
		data: {
			...reqBody,
			password: hashedPassword,
			emailVerificationToken: emailVerificationToken
		}
	});
	if (result) {
		//send email
		const resetURL = `Hello ${result.name}. <br/>Follow this link to reset password.<a href="http://localhost:3000/verify-mail?token=${result.emailVerificationToken}">Click Here</a>`;
		const info = await sendMail({
			to: result.email,
			subject: 'Verify your email',
			html: resetURL
		});

		return NextResponse.json({
			success: true,
			message: 'Registration successful. Please check your mail to activate account',
			data: { email: result.email, name: result.name }
		});
	}

	console.log(result);
	return NextResponse.json(result);
}
