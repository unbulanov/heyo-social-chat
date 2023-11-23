import { fetchClient } from "@/$api/api.fetch";
import { IUser } from "@/types/user.types";
import NextAuth from "next-auth";
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

            } catch (e) {
              console.log(e)
              throw new Error(e)
            }

            return null
          }
            try {
              const data = await fetchClient.post<{user: IUser, jwt: string}>(`/auth/local`, {
                identifier: credentials.email,
                password: credentials.password
              }
            )
          } catch (e) {
            console.log(e)
            throw new Error(e)
          }

          return null
  
          // const data = await fetchClient.get<IUser[]>(`/users?filters[email][$eq]=${credentials.email}`)
  
          // if (!user) {
          //   const { userCreate } = await grafbase.request(CreateUserByUsername, {
          //     username,
          //     passwordHash: await hash(password, 12)
          //   })
  
          //   return {
          //     id: userCreate.id,
          //     username
          //   }
          // }
  
          // const isValid = await compare(password, user.passwordHash)
  
          // if (!isValid) {
          //   throw new Error('Wrong credentials. Try again.')
          // }
  
          // return user
        }
    })
  ],

  callbacks: {
    session: async (session, token, user) => {
      return session
    }
    //   session.jwt = user.jwt;
    //   session.id = user.id;
    //   return Promise.resolve(session);
    // },
    // jwt: async (token, user, account) => {
    //   const isSignIn = user ? true : false;
    //   if (isSignIn) {
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
    //     );
    //     const data = await response.json();
    //     token.jwt = data.jwt;
    //     token.id = data.user.id;
    //   }
    //   return Promise.resolve(token);
    // },
  },
})