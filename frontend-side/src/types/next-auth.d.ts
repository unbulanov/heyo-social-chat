import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      email: string,
      username: string,
      avatar: string,
    }
  }
}