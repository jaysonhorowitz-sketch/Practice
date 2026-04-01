import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const username = process.env.APP_USERNAME
        const passwordHash = process.env.APP_PASSWORD

        if (!credentials?.username || !credentials?.password) return null
        if (credentials.username !== username) return null

        // Support both plain-text (dev) and bcrypt-hashed passwords
        const valid =
          credentials.password === passwordHash ||
          (await bcrypt.compare(credentials.password, passwordHash ?? ''))

        if (!valid) return null

        return { id: '1', name: username, email: `${username}@ugcstudio.local` }
      },
    }),
  ],
}
