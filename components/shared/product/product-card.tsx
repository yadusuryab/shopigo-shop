'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { IProduct } from '@/lib/db/models/product.model'
import { formatNumber, round2 } from '@/lib/utils'
import useSettingStore from '@/hooks/use-setting-store'
import { useFormatter } from 'next-intl'
import { useState } from 'react'

export default function ProductCardMinimal({ product }: { product: IProduct }) {
  const [hovered, setHovered] = useState(false)
  const { getCurrency } = useSettingStore()
  const currency = getCurrency()
  const format = useFormatter()

  const price = round2(currency.convertRate * product.price)
  const listPrice = round2(currency.convertRate * product.listPrice || 0)
  const discountPercent = listPrice > 0 ? Math.round(100 - (price / listPrice) * 100) : 0

  const formattedPrice = format.number(price, {
    style: 'currency',
    currency: currency.code,
    currencyDisplay: 'narrowSymbol',
  })

  const formattedListPrice = format.number(listPrice, {
    style: 'currency',
    currency: currency.code,
    currencyDisplay: 'narrowSymbol',
  })

  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="flex flex-col w-full">
        {/* Image */}
        <div
          className="relative aspect-square w-full bg-[#f3f4f6] rounded-sm overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay: discount */}
          {(discountPercent > 0 || product.tags?.includes('todays-deal')) && (
            <div className="absolute top-2 right-2 flex flex-col gap-1 text-xs font-bold z-10">
              {product.tags?.includes('todays-deal') && (
                <span className="bg-red-600 text-white text-center px-2 py-0.5 rounded">
                  Deal
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-black text-white px-2 py-0.5 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="pt-3 px-1 space-y-1.5">
          {/* Title */}
          <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="flex gap-0.5 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < Math.round(product.avgRating)
                      ? 'fill-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span>({formatNumber(product.numReviews)})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <p className="text-sm font-semibold text-foreground">{formattedPrice}</p>
            {listPrice > 0 && (
              <p className="text-xs text-muted-foreground line-through">{formattedListPrice}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
