'use client'

import useSettingStore from '@/hooks/use-setting-store'
import { cn, round2 } from '@/lib/utils'
import { useFormatter, useTranslations } from 'next-intl'

type ProductPriceProps = {
  price: number
  listPrice?: number
  isDeal?: boolean
  className?: string
}

export default function ProductPrice({
  price,
  listPrice = 0,
  isDeal = false,
  className
}: ProductPriceProps) {
  const { getCurrency } = useSettingStore()
  const currency = getCurrency()
  const format = useFormatter()
  const t = useTranslations()

  const convertedPrice = round2(currency.convertRate * price)
  const convertedListPrice = round2(currency.convertRate * listPrice)
  const discountPercent = Math.round(100 - (convertedPrice / convertedListPrice) * 100)

  const [intValue, floatValue] = convertedPrice.toString().split('.') ?? [convertedPrice.toString(), '']

  return (
    <div className={cn('space-y-2', className)}>
      {/* Tags */}
      {(isDeal || discountPercent > 0) && (
        <div className="flex gap-2 text-xs font-semibold text-muted-foreground tracking-tight">
          {isDeal && (
            <span className="px-2 py-1 bg-black text-white rounded-sm uppercase">
              {t('Product.Limited time deal')}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-1 bg-gray-100 text-black rounded-sm uppercase">
              {discountPercent}% {t('Product.Off')}
            </span>
          )}
        </div>
      )}

      {/* Price Block */}
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-medium text-muted-foreground">{currency.symbol}</span>
        <span className="text-3xl font-bold text-foreground">{intValue}</span>
        {floatValue && (
          <span className="text-sm font-medium text-muted-foreground">.{floatValue}</span>
        )}
      </div>

      {/* List Price */}
      {convertedListPrice > 0 && convertedListPrice !== convertedPrice && (
        <div className="text-sm text-muted-foreground line-through">
          {format.number(convertedListPrice, {
            style: 'currency',
            currency: currency.code,
            currencyDisplay: 'narrowSymbol',
          })}
        </div>
      )}
    </div>
  )
}
