'use client'

import { useState } from 'react'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 h-full p-4 md:col-span-2 md:order-1 order-2 overflow-x-auto md:overflow-visible">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            onMouseOver={() => setSelectedImage(index)}
            className={`overflow-hidden rounded-xl transition-all duration-300 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-primary/50 hover:scale-105 shadow-sm ${
              selectedImage === index
                ? 'ring-2 ring-primary'
                : 'ring-1 ring-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`product thumbnail ${index + 1}`}
              width={64}
              height={64}
              className="object-cover w-16 h-16"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="md:col-span-10 order-1 md:order-2">
        <Zoom>
          <AnimatePresence mode="wait">
            <motion.div
              key={images[selectedImage]}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative w-full h-[500px] rounded-xl overflow-hidden"
            >
              <Image
                src={images[selectedImage]}
                alt={`product image ${selectedImage + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </Zoom>
      </div>
    </div>
  )
}
