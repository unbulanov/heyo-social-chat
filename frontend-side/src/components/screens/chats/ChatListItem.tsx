'use client'

import { useAuth } from "@/hooks/useAuth"
import { IChat } from "@/types/chat.types"
import Image from "next/image"

export function ChatListItem({participants, messages}: IChat) {
  const { user } = useAuth()
  const correspondent = participants.find(u => u.email !== user?.email)
  const lastMessage = messages.at(-1)

  return <div className="p-layout flex items-start">
  <Image
    src={correspondent?.avatar || '/no-avatar.png'}
    alt={correspondent?.email || ''}
    width={45}
    height={45}
    className="mr-4"
  />
  <div className="text-sm">
    <div>
      <span>{correspondent?.username}</span>
      <span>{lastMessage?.createdAt}</span>
    </div>
    <div className="opacity-30">{lastMessage?.text}</div>
  </div>
</div>
}