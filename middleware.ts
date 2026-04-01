import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: { signIn: '/login' },
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/campaigns/:path*',
    '/notifications/:path*',
    '/api/campaigns/:path*',
    '/api/notifications/:path*',
  ],
}
