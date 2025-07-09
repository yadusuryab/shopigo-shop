'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import useSettingStore from '@/hooks/use-setting-store'
import { i18n } from '@/i18n-config'
import { setCurrencyOnServer } from '@/lib/actions/setting.actions'
// import { Button } from '@/components/ui/button'
import { 
  IconLanguage,
  IconLanguageHiragana,
  IconLanguageKatakana,
  IconChevronDown
} from '@tabler/icons-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LanguageSwitcher({className}:{className?:any}) {
  const { locales } = i18n
  const locale = useLocale()
  const pathname = usePathname()
  const localeIcons = {
    'en-US': IconLanguage,
    'ml': IconLanguageHiragana,
    'ar': IconLanguageKatakana,
  };
  const {
    setting: { availableCurrencies, currency },
    setCurrency,
  } = useSettingStore()
  const handleCurrencyChange = async (newCurrency: string) => {
    await setCurrencyOnServer(newCurrency)
    setCurrency(newCurrency)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <div className='flex items-center gap-1 text-xs' >
          <span className='text-xs font-bold text-foreground'>
          {React.createElement(localeIcons[locale as keyof typeof localeIcons], { 
         size:14,
          })}
          </span>
          {locale.toUpperCase().slice(0, 2)}
          <IconChevronDown  size={14}/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale}>
        {locales?.map((c) => {
            const IconComponent = localeIcons[c.code as keyof typeof localeIcons];
            return (
              <DropdownMenuRadioItem key={c.name} value={c.code}>
                <Link
                  className='w-full flex items-center gap-2'
                  href={pathname}
                  locale={c.code}
                >
                  {IconComponent && <IconComponent size={18} />}
                  {c.name}
                </Link>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={currency}
          onValueChange={handleCurrencyChange}
        >
          {availableCurrencies?.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.code}>
              {c.symbol} {c.code}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
