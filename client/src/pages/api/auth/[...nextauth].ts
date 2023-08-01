import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { URL_PATH } from '@/utils/constant'
import { login } from '@/services/auth.service'
import { Auth } from '@/types/Auth'
import { AdapterUser } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
        if (user) {
          return {
            email: user?._id,
            name: user?.name,
          } as AdapterUser
        }
        return null
      },
    }),
  ],
  session: {
    // maxAge: 30 * 24 * 60 * 60,
    maxAge: 24 * 60 * 60,
  },
  callbacks: {},
  pages: {
    signIn: URL_PATH.LOGIN_PATH,
  },
}
export default NextAuth(authOptions)
