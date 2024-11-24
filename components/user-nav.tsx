// components/user-nav.tsx
'use client'

import { Avatar } from "@nextui-org/react"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import { useSession, signOut } from 'next-auth/react'

export function UserNav() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={session.user?.image || undefined}
          name={session.user?.name?.[0] || '?'}
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{session.user?.name}</p>
          <p className="text-sm text-default-500">{session.user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="profile_page">Profile</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}