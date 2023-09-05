import prisma from '@/lib/db/prisma';

import bcryptjs from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextRequest, NextResponse } from 'next/server';

const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	pages: {
		signIn: '/login'
	},
	session: {
		strategy: 'jwt'
	},
	secret: process.env.JWT_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: {
					// label: 'Email',
					type: 'email'
					// placeholder: 'example@example.com'
				},
				password: {
					// label: 'Password',
					type: 'password'
				}
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}
				const { email, password } = credentials;
				const user = await prisma.user.findUnique({
					where: {
						email: email
					}
				});

				if (!user || !(await bcryptjs.compare(password, user.password))) {
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					activated: user.activated
					// randomKey: 'Hey cool'
				};
			}
		})
	]
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
