/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import {  IconX } from '@tabler/icons-react'
import LanguageSwitcher from './language-switcher'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

type DrawerMenuProps = {
  categories: string[]
  session: any
  t?: any
  direction?: 'ltr' | 'rtl'
  onClose: () => void
}

const DrawerMenu = React.forwardRef<HTMLDivElement, DrawerMenuProps>(
  ({ categories, session, direction='ltr',onClose }, ref) => {
    const pathname = usePathname()
    const [t, setT] = React.useState<(key: string) => string>(() => (key:any) => key)

    React.useEffect(() => {
      const loadTranslation = async () => {
        const translationFunc = await getTranslations()
        setT(() => translationFunc)
      }

      loadTranslation()
    }, [])
    // Animation variants
    const backdropVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
    
    const drawerVariants:any = {
      hidden: { x: direction === 'rtl' ? '-100%' : '100%' },
      visible: { 
        x: 0,
        transition: { 
          type: 'spring',
          damping: 25,
          stiffness: 300,
          bounce: 0.2
        }
      },
      exit: { 
        x: direction === 'rtl' ? '-100%' : '100%',
        transition: { 
          type: 'spring',
          damping: 30,
          stiffness: 300
        }
      }
    }
    
    const itemVariants:any = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.05 * i,
          type: 'spring',
          stiffness: 200,
          damping: 15
        }
      })
    }

    return (
      <div className="fixed inset-0 z-50 overflow-hidden" ref={ref}>
        {/* Backdrop */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />
        
        {/* Drawer Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={drawerVariants}
          className={cn(
            "fixed top-0 h-full w-full max-w-md bg-background shadow-xl",
            direction === 'rtl' ? 'left-0' : 'right-0'
          )}
        >
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Header with close button */}
            <motion.div 
              className="flex justify-end p-6"
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
            <Button 
  variant="ghost" 
  size="icon" 
  className="rounded-full"
  onClick={onClose}
>
  <IconX className="h-6 w-6" />
  <span className="sr-only">Close</span>
</Button>
               
            </motion.div>
            
            {/* User greeting */}
            <motion.div 
              className="px-6 mb-8"
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {session ? (
                <Link 
                  href="/account" 
                  className="text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity"
                >
                  {t('Header.Hello')}, {session.user.name}
                </Link>
              ) : (
                <Link 
                  href="/sign-in" 
                  className="text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity"
                >
                  {t('Header.Hello')}, {t('Header.sign in')}
                </Link>
              )}
            </motion.div>
            
            {/* Categories */}
            <div className="px-6 mb-8 space-y-1">
              {categories.map((category, i) => (
                <motion.div
                  key={category}
                  custom={i + 2}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={`/search?category=${category}`}
                    className={cn(
                      "block py-4 text-2xl font-semibold hover:opacity-70 transition-opacity",
                      pathname.includes(category.toLowerCase()) ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {category}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Language switcher */}
            <motion.div 
              className="px-6 mb-8"
              custom={categories.length + 3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <LanguageSwitcher />
            </motion.div>
            
            {/* Help & Settings */}
            <motion.div 
              className="border-t border-border pt-6 px-6 space-y-4"
              custom={categories.length + 4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/account"
                className="block text-lg font-medium hover:opacity-70 transition-opacity"
              >
                {t('Header.Your account')}
              </Link>
              <Link
                href="/page/customer-service"
                className="block text-lg font-medium hover:opacity-70 transition-opacity"
              >
                {t('Header.Customer Service')}
              </Link>
              
              {session ? (
                <form action={SignOut}>
                  <Button
                    variant="link"
                    className="p-0 text-lg font-medium h-auto hover:opacity-70 transition-opacity"
                  >
                    {t('Header.Sign out')}
                  </Button>
                </form>
              ) : (
                <Link
                  href="/sign-in"
                  className="block text-lg font-medium hover:opacity-70 transition-opacity"
                >
                  {t('Header.Sign in')}
                </Link>
              )}
            </motion.div>
            
            {/* Footer links */}
            <motion.div 
              className="mt-auto border-t border-border px-6 py-8 space-y-3"
              custom={categories.length + 5}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {['Contact us', 'Instagram', 'FAQ'].map((item, i) => (
                <motion.div
                  key={item}
                  custom={categories.length + 6 + i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={`/${item.toLowerCase().replaceAll(' ', '-')}`}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }
)
DrawerMenu.displayName = 'DrawerMenu'

export { DrawerMenu }