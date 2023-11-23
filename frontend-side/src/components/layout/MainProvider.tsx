'use client'

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function MainProvider({ children }: PropsWithChildren<unknown>) {
  return <SessionProvider>{children}</SessionProvider>
}