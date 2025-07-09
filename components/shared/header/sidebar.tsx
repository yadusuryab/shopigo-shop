import * as React from 'react'
import Link from 'next/link'
// import { X, ChevronRight,  } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
 
  DrawerTrigger,
} from '@/components/ui/drawer'
import { auth } from '@/auth'
import { getLocale, getTranslations } from 'next-intl/server'
import { getDirection } from '@/i18n-config'
import { IconMenu,IconX } from '@tabler/icons-react'
import LanguageSwitcher from './language-switcher'

type SidebarProps = {
  categories: string[]
}

export default async function Sidebar({ categories }: SidebarProps) {
  const session = await auth()
  const locale = await getLocale()
  const t = await getTranslations()
  const direction = getDirection(locale)

  // const renderUserSection = () => (
  //   <div className="flex items-center justify-between text-foreground">
  //     <DrawerHeader>
  //       <DrawerTitle className="flex items-center">
  //         <IconUserCircle className="h-6 w-6 mr-2" />
  //         {session ? (
  //           <DrawerClose asChild>
  //             <Link href="/account">
  //               <span className="text-lg font-semibold">
  //                 {t('Header.Hello')}, {session.user.name}
  //               </span>
  //             </Link>
  //           </DrawerClose>
  //         ) : (
  //           <DrawerClose asChild>
  //             <Link href="/sign-in">
  //               <span className="text-lg font-semibold">
  //                 {t('Header.Hello')}, {t('Header.sign in')}
  //               </span>
  //             </Link>
  //           </DrawerClose>
  //         )}
  //       </DrawerTitle>
  //       <DrawerDescription></DrawerDescription>
  //     </DrawerHeader>
  //     <DrawerClose asChild>
  //       <Button variant="ghost" size="icon" className="mr-2">
  //         <IconX className="h-5 w-5" />
  //         <span className="sr-only">Close</span>
  //       </Button>
  //     </DrawerClose>
  //   </div>
  // )

  // const renderCategorySection = () => (
  //   <div className="flex-1 overflow-y-auto">
  //     <div className="p-4 border-b">
  //       <h2 className="text-lg font-semibold">
  //         {t('Header.Shop By Department')}
  //       </h2>
  //     </div>
  //     <nav className="flex flex-col">
  //       {categories?.map((category) => (
  //         <DrawerClose asChild key={category}>
  //           <Link
  //             href={`/search?category=${category}`}
  //             className="flex items-center justify-between py-3 px-4 hover:bg-secondary transition-colors"
  //           >
  //             <span>{category}</span>
  //             <IconChevronRight className="h-4 w-4" />
  //           </Link>
  //         </DrawerClose>
  //       ))}
  //     </nav>
  //   </div>
  // )

  // const renderHelpSection = () => (
  //   <div className="border-t flex flex-col">
  //     <div className="p-4">
  //       <h2 className="text-lg font-semibold">
  //         {t('Header.Help & Settings')}
  //       </h2>
  //     </div>
  //     <DrawerClose asChild>
  //       <Link 
  //         href="/account" 
  //         className="py-3 px-4 hover:bg-secondary transition-colors"
  //       >
  //         {t('Header.Your account')}
  //       </Link>
  //     </DrawerClose>
  //     <DrawerClose asChild>
  //       <Link 
  //         href="/page/customer-service" 
  //         className="py-3 px-4 hover:bg-secondary transition-colors"
  //       >
  //         {t('Header.Customer Service')}
  //       </Link>
  //     </DrawerClose>
  //     {session ? (
  //       <form action={SignOut} className="w-full">
  //         <Button
  //           className="w-full justify-start py-3 px-4 hover:bg-secondary transition-colors text-base"
  //           variant="ghost"
  //         >
  //           {t('Header.Sign out')}
  //         </Button>
  //       </form>
  //     ) : (
  //       <Link 
  //         href="/sign-in" 
  //         className="py-3 px-4 hover:bg-secondary transition-colors"
  //       >
  //         {t('Header.Sign in')}
  //       </Link>
  //     )}
  //   </div>
  // )

  return (
    <Drawer direction={direction === 'rtl' ? 'left' : 'right'}>
    <DrawerTrigger className="flex items-center gap-[7px] font-medium">
      <IconMenu size={30} />
    </DrawerTrigger>
  
    <DrawerContent className="mt-0 top-0 h-full max-h-screen bg-background text-foreground">
      <div className="flex flex-col h-full">
  
        {/* Close Button Top Right */}
        <div className="flex justify-end p-4">
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <IconX className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>
        </div>
  
        {/* Hello User / Sign in */}
        <div className="px-6 mb-6">
          {session ? (
            <DrawerClose asChild>
              <Link href="/account" className="text-lg font-semibold">
                {t('Header.Hello')}, {session.user.name}
              </Link>
            </DrawerClose>
          ) : (
            <DrawerClose asChild>
              <Link href="/sign-in" className="text-lg font-semibold">
                {t('Header.Hello')}, {t('Header.sign in')}
              </Link>
            </DrawerClose>
          )}
        </div>
  
        {/* Category Links - OHM Style */}
        <div className="flex flex-col gap-3 px-6 mb-6">
          {categories?.map((category) => (
            <DrawerClose asChild key={category}>
              <Link
                href={`/search?category=${category}`}
                className="text-3xl font-semibold leading-none"
              >
                {category}
              </Link>
            </DrawerClose>
          ))}
        </div>
  
        {/* Language Switch like ohm.studio */}
        <div className="px-6 pb-6">
          <LanguageSwitcher/>
        </div>
  
        {/* Help & Settings */}
        <div className="border-t px-6 pt-6  flex items-center gap-2">
          <DrawerClose asChild>
            <Link href="/account" className="text-base font-medium">
              {t('Header.Your account')}
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link href="/page/customer-service" className="text-base font-medium">
              {t('Header.Customer Service')}
            </Link>
          </DrawerClose>
  
          {session ? (
            <form action={SignOut} className="w-full">
              <Button
                className="w-full justify-start px-0 text-base font-medium"
                variant="ghost"
              >
                {t('Header.Sign out')}
              </Button>
            </form>
          ) : (
            <DrawerClose asChild>
              <Link href="/sign-in" className="text-base font-medium">
                {t('Header.Sign in')}
              </Link>
            </DrawerClose>
          )}
        </div>
  
        {/* Footer Links like OHM - bottom aligned */}
        <div className="mt-auto border-t px-6 py-4 space-y-2">
          {['Contact us', 'Instagram', 'FAQ'].map((item) => (
            <DrawerClose asChild key={item}>
              <Link
                href={`/${item.toLowerCase().replaceAll(' ', '-')}`}
                className="text-sm font-medium hover:opacity-70"
              >
                {item}
              </Link>
            </DrawerClose>
          ))}
        </div>
      </div>
    </DrawerContent>
  </Drawer>  
  )
}