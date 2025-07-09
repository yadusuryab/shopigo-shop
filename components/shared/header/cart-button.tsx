'use client'


import Link from 'next/link'
import useIsMounted from '@/hooks/use-is-mounted'
// import useShowSidebar from '@/hooks/use-cart-sidebar'
// import { cn } from '@/lib/utils'
import useCartStore from '@/hooks/use-cart-store'
// import { useLocale } from 'next-intl'
// import { getDirection } from '@/i18n-config'
// import { Button } from '@/components/ui/button'
// import { IconShoppingBag } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

export default function CartButton() {
  const isMounted = useIsMounted()
  const {
    cart: { items},
  } = useCartStore()
   const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)
  // const showSidebar = useShowSidebar()
  const t = useTranslations()

  // const locale = useLocale()
  return (
    <Link href='/cart' className='flex items-center gap-[7px]  font-medium '>
      
      {/* <Button className='relative' variant={'ghost'} size={'icon'}> */}
        {/* <IconShoppingBag size={20} /> */}
        
        
      <span className='text-muted-foreground'> {t('Header.Cart')}    {isMounted && (
      
            `(${cartItemsCount})`
       
        )}</span> 

        {/* {showSidebar && (
          <div
            className={`absolute top-[20px] ${
              getDirection(locale) === 'rtl'
                ? 'left-[-16px] rotate-[-270deg]'
                : 'right-[-16px] rotate-[-90deg]'
            }  z-10   w-0 h-0 border-l-[7px] border-r-[7px] border-b-[8px] border-transparent border-b-background`}
          ></div>
        )} */}
      {/* </Button> */}
    </Link>
  )
}
