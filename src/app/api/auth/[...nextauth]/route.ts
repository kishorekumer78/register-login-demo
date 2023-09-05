import prisma from '@/lib/db/prisma';
import bcryptjs from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
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
			name: 'Credentials',
			async authorize(credentials, req) {
				let email = credentials?.email;
				let password = credentials?.password;

				const user = await prisma.user.findUnique({
					where: { email: email }
				});
				if (user) {
					const isValid = await bcryptjs.compare(password!, user.password);
					if (isValid) {
						return user;
					}
				} else {
					return null;
				}
			}
		})
	]
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
