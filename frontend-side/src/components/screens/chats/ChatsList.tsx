'use client'
import { fetchClient } from "@/$api/api.fetch";
import Field from "@/components/ui/field/Field";
import { Loader } from "@/components/ui/loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import { IStrapiChat, IStrapiResponse } from "@/types/chat.types";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { ChatListItem } from "./ChatListItem";

export function ChatsList() {
  const { user, isLoggedIn } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: () => fetchClient.get<{ data: IStrapiResponse<IStrapiChat>[] }>(
      `/chats?sort=createdAt:desc
      &populate[messages]=*
      &populate[participants][populate][avatar]=*
      &filters[participants][email][$eq]=${user?.email}
      `,
      true
    ),
    enabled: isLoggedIn,
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
          ) : data?.data.length ? (
            data?.data.map(({ id, attributes: chat }) => {
              return <ChatListItem key={id} data={chat} id={id} />
            })
          ) : (
            <p className="p-layout">Chats not found</p>
          )}
      </div>
    </div>
  )
}