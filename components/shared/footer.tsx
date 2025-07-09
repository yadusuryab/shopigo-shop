/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import useSettingStore from '@/hooks/use-setting-store'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './header/language-switcher'
import { IconArrowRight, IconArrowUp } from '@tabler/icons-react'

export default function Footer() {
  const {
    setting: { site }
  } = useSettingStore()
  const t = useTranslations()
  
  // Scroll state management
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }
    
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Animation variants
  const containerVariants:any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants:any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const backgroundTextVariants:any = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 0.03,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className=' relative overflow-hidden bg-secondary rounded-t-xl'
    >
      <div className='w-full min-h-[530px] flex flex-col justify-center relative z-10'>
        {/* Floating Back to Top Button */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className='fixed bottom-6 right-6 z-50'
            >
              <Button
                className='rounded-full shadow-lg bg-background text-foreground hover:bg-foreground hover:text-background transition-all'
                size={'icon'}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <IconArrowUp className='h-5 w-5' />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Footer Content */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-8 md:px-[52px] px-[24px] w-full mx-auto max-w-7xl'>
        <p className='text-2xl font-bold col-span-2 md:col-span-3 pt-4  tracking-tighter '>This is more than a store — it&apos;s a statement, crafted with <span className="text-primary italic">Shopigo</span>.
        <Link className="underline flex items-center gap-2 text-muted-foreground" href="https://instagram.com/getshopigo" target="_blank">Join the creators <IconArrowRight size={30} className="ml-2"/></Link></p>
          <motion.div variants={itemVariants}>
           
            <h3 className='font-bold mb-4 text-lg tracking-tight'>{t('Footer.Let Us Help You')}</h3>
            <ul className='space-y-3 font-medium text-muted-foreground'>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href='/page/shipping' className='hover:text-foreground transition-colors'>
                  {t('Footer.Shipping Rates & Policies')}
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href='/page/returns-policy' className='hover:text-foreground transition-colors'>
                  {t('Footer.Returns & Replacements')}
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href='/page/help' className='hover:text-foreground transition-colors'>
                  {t('Footer.Help')}
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 col-span-1 flex justify-end"
          >
            <div className='space-y-4'>
              <h3 className="font-bold italic text-2xl tracking-tighter">shopigo</h3>
              <motion.div whileHover={{ scale: 1.05 }}>
                <LanguageSwitcher/>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Links */}
        <motion.div 
          variants={itemVariants}
          className='md:px-[52px] px-[24px] mt-20 max-w-7xl mx-auto w-full'
        >
          <div className='md:flex font-medium text-muted-foreground grid gap-4 text-sm flex-wrap'>
            <motion.p whileHover={{ scale: 1.02 }}>© {site.copyright}</motion.p>
            <motion.p whileHover={{ scale: 1.02 }}>{site.address} | {site.phone}</motion.p>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link href='/page/conditions-of-use' className='hover:text-foreground transition-colors'>
                {t('Footer.Conditions of Use')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link href='/page/privacy-policy' className='hover:text-foreground transition-colors'>
                {t('Footer.Privacy Notice')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Branding */}
      <motion.div 
        variants={backgroundTextVariants}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <h2 className="text-[20vw] font-black tracking-tighter text-foreground/5 select-none">
          SHOPIGO
        </h2>
      </motion.div>

      {/* Powered By Section */}
      <motion.div 
        variants={itemVariants}
        className='w-full relative z-10 pb-10'
      >
        <div className='text-center text-muted-foreground text-sm font-medium'>
          Powered by{' '}
          <Link 
            href='https://shopigo.live' 
            target='_blank' 
            className='border-b border-transparent hover:border-foreground transition-all font-semibold'
          >
            Shopigo
          </Link>
        </div>
      </motion.div>
    </motion.footer>
  )
}