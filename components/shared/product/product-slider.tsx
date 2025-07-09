'use client'

import * as React from 'react'
import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { IProduct } from '@/lib/db/models/product.model'
import { Button } from '@/components/ui/button'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import ProductCardMinimal from './product-card-simple'

export default function ProductSlider({
  title,
  products,
}: {
  title?: string
  products: IProduct[]
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    
    const containerWidth = scrollRef.current.clientWidth
    const scrollAmount = Math.floor(containerWidth * 0.8) // Scroll 80% of container width
    
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemVariants:any = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const titleVariants:any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="w-full space-y-6 bg-background"
    >
      {/* Header */}
      <motion.div 
        variants={titleVariants}
        className="flex items-center justify-between p-4"
      >
        {title && (
          <h2 className="text-2xl font-bold tracking-tighter">{title}</h2>
        )}
        <div className="flex gap-2">
          <Button
            onClick={() => scroll('left')}
            className="rounded-full p-2 hover:bg-gray-100"
            variant="secondary"
            size="icon"
          >
            <IconChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => scroll('right')}
            className="rounded-full"
            variant="secondary"
            size="icon"
          >
            <IconChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Scrollable Card Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 pb-4 hide-scrollbar snap-x snap-mandatory"
      >
        {products.map((product) => (
          <motion.div
            key={product.slug}
            variants={itemVariants}
            className="flex-shrink-0 w-[300px] h-full snap-start"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ProductCardMinimal product={product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}