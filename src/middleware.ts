import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/dashboard')) {
		const sessionToken = request.cookies.get('next-auth.session-token');
		if (sessionToken) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}
}
