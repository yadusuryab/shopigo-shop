/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { Button } from '@/components/ui/button'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

type CategoryCardProps = {
  title: string
  variant: 'scroll'
  items: {
    name: string
    image?: string
    href: string
  }[]
}

const CategoryScroll: React.FC<CategoryCardProps> = ({ title, variant, items }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  if (variant !== 'scroll') return null

  const checkScrollPosition = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftButton(scrollLeft > 0)
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const currentRef = scrollRef.current
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollPosition)
      checkScrollPosition() // Initial check
      return () => currentRef.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  // Animation variants
  const containerVariants:any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants:any = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  }

  // const buttonVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1 }
  // }

  return (
    <motion.section 
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="w-full rounded-t-xl bg-background relative"
    >
      <div className="mb-6 flex items-center justify-between p-4">
        <motion.h2 
          variants={itemVariants}
          className="text-xl font-medium tracking-tighter"
        >
          {title}
        </motion.h2>
        
        <motion.div 
          variants={itemVariants}
          className="flex gap-2"
        >
          <motion.div
            animate={{ opacity: showLeftButton ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: showLeftButton ? 'auto' : 'none' }}
          >
            <Button
              onClick={() => scroll('left')}
              className="rounded-full p-2 hover:bg-gray-100 transition-opacity"
              variant={'secondary'}
              size={'icon'}
              aria-label="Scroll left"
            >
              <IconChevronLeft className="w-5 h-5" />
            </Button>
          </motion.div>
          
          <motion.div
            animate={{ opacity: showRightButton ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: showRightButton ? 'auto' : 'none' }}
          >
            <Button
              onClick={() => scroll('right')}
              className="rounded-full p-2 hover:bg-gray-100 transition-opacity"
              variant={'secondary'}
              size={'icon'}
              aria-label="Scroll right"
            >
              <IconChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-4 sm:px-8 scroll-smooth hide-scrollbar pb-6"
        >
          {items.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex flex-col flex-shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link
                href={item.href}
                className="relative min-w-[300px] aspect-[4/3] flex-shrink-0 overflow-hidden bg-secondary rounded-xl group block"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
                    <span className="text-lg font-medium px-4 text-center">{item.name}</span>
                  </div>
                )}
              </Link>
              <div className="py-2 font-medium text-muted-foreground  mt-2">
                {item.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gradient fade effects */}
        {/* <div 
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"
          style={{ opacity: showLeftButton ? 1 : 0, transition: 'opacity 0.3s' }}
        />
        <div 
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"
          style={{ opacity: showRightButton ? 1 : 0, transition: 'opacity 0.3s' }}
        /> */}
      </div>
    </motion.section>
  )
}

export default CategoryScroll