export interface IUser {
	username: string
	email: string
	confirmed: boolean
	role: string
	avatar: string
}

export type UserJwt = {
	user: IUser
	jwt: string
}
