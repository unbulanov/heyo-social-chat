import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: User,
  }

  interface User {
    id?: string,
    email?: string,
    avatar?: string,
    username?: string,
    jwt?: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string,
  }
}