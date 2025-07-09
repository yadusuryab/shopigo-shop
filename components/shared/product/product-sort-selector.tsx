'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  // SelectValue,
} from '@/components/ui/select'
import { getFilterUrl } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ProductSortSelector({
  sortOrders,
  sort,
  params,
}: {
  sortOrders: { value: string; name: string }[]
  sort: string
  params: {
    q?: string
    category?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }
}) {
  const router = useRouter()
  return (
    <Select
      onValueChange={(v) => {
        router.push(getFilterUrl({ params, sort: v }))
      }}
      value={sort}
    
    >
      <SelectTrigger className='w-fit border-none shadow-none text-md text-muted-foreground'>
        
          <span className='text-foreground'>Sort By:&nbsp;</span> {sortOrders.find((s) => s.value === sort)!.name}
       
      </SelectTrigger>

      <SelectContent>
        {sortOrders?.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
