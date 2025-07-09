'use client'
import useSettingStore from '@/hooks/use-setting-store'
import { cn, round2 } from '@/lib/utils'
import { useFormatter, useTranslations } from 'next-intl'

type ProductPriceProps = {
  price: number
  isDeal?: boolean
  listPrice?: number
  className?: string
  forListing?: boolean
  plain?: boolean
}

const ProductPrice = ({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: ProductPriceProps) => {
  const { getCurrency } = useSettingStore()
  const currency = getCurrency()
  const t = useTranslations()
  const format = useFormatter()

  // Color variables
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary-foreground',
    accent: 'text-accent-foreground',
    accentBackground: 'bg-accent',
    dealAccent: 'text-primary-foreground',
    dealBackground: 'bg-primary',
    limitedDealBackground: 'bg-destructive',
    savings: 'text-green-600',
    strikeThrough: 'line-through'
  }

  // Convert prices based on currency rate
  const convertedPrice = round2(currency.convertRate * price)
  const convertedListPrice = round2(currency.convertRate * listPrice)
  const discountPercent = Math.round(100 - (convertedPrice / convertedListPrice) * 100)
  
  // Split price into integer and decimal parts
  const [intValue, floatValue] = convertedPrice.toString().includes('.') 
    ? convertedPrice.toString().split('.') 
    : [convertedPrice.toString(), '']

  // Format prices
  const formattedPrice = format.number(convertedPrice, {
    style: 'currency',
    currency: currency.code,
    currencyDisplay: 'narrowSymbol',
  })

  const formattedListPrice = format.number(convertedListPrice, {
    style: 'currency',
    currency: currency.code,
    currencyDisplay: 'narrowSymbol',
  })

  // Plain price display (simplest case)
  if (plain) {
    return <span className={className}>{formattedPrice}</span>
  }

  // No list price case
  if (convertedListPrice === 0) {
    return (
      <div className={cn('flex items-baseline', className)}>
        <span className={`text-2xl  font-medium text-foreground`}>{currency.symbol}</span>
        <span className={`text-2xl font-bold text-foreground`}>{intValue}</span>
        {floatValue && (
          <span className={`text-sm font-medium text-muted-foreground`}>.{floatValue}</span>
        )}
      </div>
    )
  }

  // Full price display with discounts
  return (
    <div className={cn('space-y-1', !forListing && 'w-full', className)}>
      {/* Discount badges */}
      {(isDeal || discountPercent > 0) && (
        <div className={cn(
          'flex items-center gap-2',
          forListing ? 'justify-center' : 'justify-start'
        )}>
          {isDeal && (
            <span className={`px-2 py-1 text-xs font-bold ${colors.limitedDealBackground} ${colors.dealAccent}`}>
              {t('Product.Limited time deal')}
            </span>
          )}
          <span className={cn(
            'px-2 py-1 text-xs font-bold',
            isDeal 
              ? `${colors.dealBackground} ${colors.dealAccent}`
              : `${colors.accentBackground} ${colors.accent}`
          )}>
            {discountPercent}% {t('Product.Off')}
          </span>
        </div>
      )}

      {/* Price display */}
      <div className={cn(
        'flex items-baseline gap-2',
        forListing ? 'justify-center' : 'justify-start'
      )}>
        <div className="flex items-baseline">
          <span className={`text-2xl  text-muted-foreground`}>{currency.symbol}</span>
          <span className={`text-2xl font-bold text-foreground`}>{intValue}</span>
          {floatValue && (
            <span className={`text-sm font-medium text-muted-foreground`}>.{floatValue}</span>
          )}
        </div>

        {/* Original price */}
        {convertedListPrice > 0 && (
          <div className={`text-sm text-muted-foreground`}>
            {!isDeal && <span className="mx-1">{t('Product.Was')}</span>}
            <span className={colors.strikeThrough}>{formattedListPrice}</span>
            
          </div>
        )}
      </div>

      {/* Savings message */}
      {!isDeal && discountPercent > 0 && (
        <div className={`text-xs ${colors.savings}`}>
          You Save {formattedListPrice} ({discountPercent}%)
        </div>
      )}
    </div>
  )
}

export default ProductPrice