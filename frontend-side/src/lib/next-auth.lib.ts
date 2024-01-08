import { fetchClient } from "@/$api/api.fetch";
import { IUser } from "@/types/user.types";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth ({
  providers: [
    Credentials({
      credentials: {
        username: {
          type: 'text'
        },
        email: {
          type: 'text',
        },
        password: { type: 'password' },
      },

        async authorize(credentials) {

          if(!credentials?.email || !credentials.password) return null

          if(credentials.username) {
            try {
              const data = await fetchClient.post<{user: IUser, jwt: string}>(`/auth/local/register`, credentials)

              return {
                id: data.user.email,
                email: data.user.email,
                avatar: data.user.avatar,
                username: data.user.username,
                jwt: data.jwt,
              } as User

            } catch (e) {
              return Promise.reject({
                message: 'Register error, not valid data!'
              })
            }
          }
            try {
              const data = await fetchClient.post<{user: IUser; jwt: string}>(`/auth/local`, {
                identifier: credentials.email,
                password: credentials.password
              }
            )

            return {
              email: data.user.email,
              username: data.user.username,
              avatar: data.user.avatar,
              id: data.user.email,
              jwt: data.jwt,
            } as User
          } catch (e) {
            return Promise.reject({
              message: 'Login error, not valid data!'
            })
          }
        }
    })
  ],

  callbacks: {
    jwt({ token, user, account }) {
      return { ...token, ...user }
    },
    session({ session, token, user }) {
      session.user = token as User
      return session
    },
  },
})