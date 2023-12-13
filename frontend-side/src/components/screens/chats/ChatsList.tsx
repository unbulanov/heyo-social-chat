'use client'
import { fetchClient } from "@/$api/api.fetch";
import Field from "@/components/ui/field/Field";
import { Loader } from "@/components/ui/loader/Loader";
import { IChat } from "@/types/chat.types";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { ChatListItem } from "./ChatListItem";

export function ChatsList() {
  const { data, isLoading } = useQuery({
    queryKey: ['chats'],
    //@ts-ignore
    queryFn: () => fetchClient.get<IChat[]>('/chats', true)
  })
  return (
    <div>
      <div className="border-t border-b border-border p-layout">
        <Field placeholder="Search chats" Icon={Search} />
      </div>
      <div>
        {isLoading ? (
          <div className="p-layout">
            <Loader />
          </div>
          ) : data?.length ? (
            data.map(chat => <ChatListItem key={chat.id} {...chat} />)
          ) : (
            <p className="p-layout">Chats not found</p>
          )}
      </div>
    </div>
  )
}