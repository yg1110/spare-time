import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { URL_PATH } from '@/utils/constant'
import { Auth } from '@/types/Auth'
import { login } from '@/services/auth.service'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credential',
      name: 'Credentials',
      credentials: {
        id: { label: 'id', type: 'text', placeholder: 'id' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        const auth: Auth = {
          id: credentials.id,
          password: credentials.password,
        }
        const user = await login<Auth>(auth)
        if (user) return user
        return null
      },
    }),
  ],
  session: {
    // maxAge: 30 * 24 * 60 * 60,
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    // Set up callbacks if required
  },
  pages: {
    signIn: URL_PATH.LOGIN_PATH,
  },
}
export default NextAuth(authOptions)
