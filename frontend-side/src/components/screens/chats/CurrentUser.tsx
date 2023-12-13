'use client'

import { useAuth } from "@/hooks/useAuth"
import Image from "next/image"

export function CurrentUser() {
  const {user} = useAuth()

  return (
    <div className="p-layout flex items-start">
      <Image
        src={user?.avatar || '/no-avatar.png'}
        alt={user?.email || ''}
        width={50}
        height={50}
        className="mr-4"
        priority
      />
      <div className="text-sm">
      <div>{user?.username}</div>
      <div className="opacity-30">UX/UI Designer</div>
      </div>
    </div>
  )
}