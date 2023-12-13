'use client'

import cn from 'clsx';
import { Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.scss';
import { MENU } from './sidebar.data';

export function Sidebar() {
  const pathname = usePathname()

  const { isLoggedIn } = useAuth()

  return <aside className={styles.sidebar}>

    {isLoggedIn ? <>
    <Image src='/logo.svg' priority alt="" width={45} height={45} />

    <div>
      {MENU.map(item => (
        <Link href={item.url} key={item.url} className={
          cn({
            [styles.active]: pathname === item.url,
          })
        }>
          <item.Icon size={27} />
      </Link>
      ))}
    </div>
    <Sun size={27} />
    </> : null }
  </aside>
}