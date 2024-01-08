'use client'

import { useAuth } from "@/hooks/useAuth"
import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function CurrentUser() {
  const {user} = useAuth()
  const {push} = useRouter()

  return (
    <div className="p-layout flex items-start justify-between">
      <div className="flex items-center">
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
      <button onClick={() => signOut({
        redirect: false
      }).then(() => {
        window.localStorage.removeItem('token')
        push('/login')
      })} 
      className="text-[#7C7275] hover:text-white transition-colors ease-linear">
        <LogOutIcon />
      </button>
    </div>
  )
}