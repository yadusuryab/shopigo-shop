import { Button } from '@/components/ui/button'
import { IProduct } from '@/lib/db/models/product.model'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function SelectVariant({
  product,
  size,
  color,
}: {
  product: IProduct
  color: string
  size: string
}) {
  const selectedColor = color || product.colors[0]
  const selectedSize = size || product.sizes[0]

  return (
    <>
      {product.colors.length > 0 && (
        <div className='space-x-2 space-y-2 border-t-2 p-4 flex items-center text-muted-foreground font-medium tracking-tight justify-between'>
          <div>Color</div>
          {product.colors?.map((x: string) => (
            <div
              
              
              className={
                cn(selectedColor === x ? 'border-2 border-primary' : 'border-2','px-0 py-0 rounded-full   ')
              }
              key={x}
            >
              <Link
                replace
                scroll={false}
                href={`?${new URLSearchParams({
                  color: x,
                  size: selectedSize,
                })}`}
                key={x}
              >
                <div
                  style={{ backgroundColor: x }}
                  className='h-4 w-4  rounded-full'
                ></div>
                {/* {x} */}
              </Link>
            </div>
          ))}
        </div>
      )}
      {product.sizes.length > 0 && (
        <div className='mt-2 border-t-2  text-muted-foreground font-medium  space-x-2 p-4 space-y-2  flex items-center font-medium tracking-tight justify-between'>
          <div>Size</div>
          {product.sizes?.map((x: string) => (
            <Button
              asChild
              variant='outline'
              size={'icon'}
              className={
                cn(selectedSize === x ? 'border-2 border-primary' : 'border-2','px-0 py-0 rounded-full   ')
                                }
              key={x}
            >
              <Link
                replace
                scroll={false}
                href={`?${new URLSearchParams({
                  color: selectedColor,
                  size: x,
                })}`}
              >
                {x}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
