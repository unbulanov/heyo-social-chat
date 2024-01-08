import { IUser } from "./user.types"

export interface IMessage {
  id: string,
  text: string
  createdAt: string,
  sender: IUser
}

export interface IChat {
  id: string,
  messages: IMessage[],
  participants: IUser[]
}

export interface IStrapiChat {
	messages: { data: IStrapiResponse<IMessage>[] }
	participants: { data: IStrapiResponse<IUser>[] }
}

export interface IStrapiResponse<T> {
	attributes: T
	id: number
}