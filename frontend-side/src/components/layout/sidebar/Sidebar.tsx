'use client'

import cn from 'clsx';
import { Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.scss';
import { MENU } from './sidebar.data';

const isLoggedIn = false;

export function Sidebar() {
  const pathname = usePathname()

  if (!isLoggedIn) return null

  return <aside className={styles.sidebar}>
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
  </aside>
}