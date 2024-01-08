'use client'

import { useAuth } from '@/hooks/useAuth'
import { IStrapiChat } from '@/types/chat.types'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

interface IChatListItem {
	id: number
	data: IStrapiChat
}

export function ChatListItem({ data: chat, id }: IChatListItem) {
	const { user } = useAuth()

	const correspondent = chat.participants.data.find(
		u => u.attributes.email !== user?.email
	)
	const lastMessage = chat.messages.data.at(-1)

	console.log(correspondent)

	return (
		<Link
			href={`/chat/${id}`}
			className='p-layout flex items-center border-b border-border duration-300 ease-linear transition-colors hover:bg-border'
		>
			<Image
				src={correspondent?.attributes.avatar || '/no-avatar.png'}
				alt={correspondent?.attributes.email || ''}
				width={45}
				height={45}
				className='mr-4'
			/>
			<div className='text-sm w-full'>
				<div className='flex items-center justify-between'>
					<span>{correspondent?.attributes.username}</span>
					<span className='text-xs opacity-30'>
						{dayjs(lastMessage?.attributes.createdAt).format('HH:mm')}
					</span>
				</div>
				<div className='opacity-30 mt-0.5'>{lastMessage?.attributes.text}</div>
			</div>
		</Link>
	)
}
