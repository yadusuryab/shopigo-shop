/* eslint-disable @typescript-eslint/no-explicit-any */
// components/sidebar-client.tsx
"use client"

import { DrawerMenu } from './drawer-menu'
import { Button } from '@/components/ui/button'
import { IconMenu } from '@tabler/icons-react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

export function SidebarClient({
  categories,
  session,
//   t,
//   direction
}: {
  categories: string[]
  session: any
//   t: any
//   direction: 'ltr' | 'rtl'
}) {
  const [isOpen, setIsOpen] = useState(false)
    // const [t,setT]=useState()

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="flex items-center gap-[7px] font-medium"
        onClick={() => setIsOpen(true)}
      >
        <IconMenu size={20} />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <DrawerMenu
            categories={categories}
            session={session}
            // t={t}
            // direction={direction}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}