'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'
import { UploadButton } from '@/lib/uploadthing'
import { ProductInputSchema, ProductUpdateSchema } from '@/lib/validator'
import { Checkbox } from '@/components/ui/checkbox'
import { toSlug } from '@/lib/utils'
import { IProductInput } from '@/types'
import { X, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'


// Predefined options from the product data
const CATEGORIES = ['T-Shirts', 'Jeans', 'Wrist Watches', 'Shoes'] as const
const TAGS = ['new-arrival', 'featured', 'best-seller', 'todays-deal'] as const

const productDefaultValues: IProductInput =
  process.env.NODE_ENV === 'development'
    ? {
        name: 'Sample Product',
        slug: 'sample-product',
        category: 'Sample Category',
        images: ['/images/p11-1.jpg'],
        brand: 'Sample Brand',
        description: 'This is a sample description of the product.',
        price: 99.99,
        listPrice: 0,
        countInStock: 15,
        numReviews: 0,
        avgRating: 0,
        numSales: 0,
        isPublished: false,
        tags: ['sample', 'test'],
        sizes: ['S', 'M', 'L'],
        colors: ['Red', 'Blue'],
        ratingDistribution: [],
        reviews: [],
      }
    : {
        name: '',
        slug: '',
        category: '',
        images: [],
        brand: '',
        description: '',
        price: 0,
        listPrice: 0,
        countInStock: 0,
        numReviews: 0,
        avgRating: 0,
        numSales: 0,
        isPublished: false,
        tags: [],
        sizes: [],
        colors: [],
        ratingDistribution: [],
        reviews: [],
      }

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update'
  product?: IProduct
  productId?: string
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [newColor, setNewColor] = useState('')
  const [newSize, setNewSize] = useState('')

  const form = useForm<IProductInput>({
    resolver:
      type === 'Update'
        ? zodResolver(ProductUpdateSchema)
        : zodResolver(ProductInputSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  })

  async function onSubmit(values: IProductInput) {
    if (type === 'Create') {
      const res = await createProduct(values)
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
      } else {
        toast({
          description: res.message,
        })
        router.push(`/admin/products`)
      }
    }
    if (type === 'Update') {
      if (!productId) {
        router.push(`/admin/products`)
        return
      }
      const res = await updateProduct({ ...values, _id: productId })
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
      } else {
        router.push(`/admin/products`)
      }
    }
  }

  const images = form.watch('images')
  const colors = form.watch('colors')
  const sizes = form.watch('sizes')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tags = form.watch('tags')

  const handleAddColor = () => {
    if (newColor && !colors?.includes(newColor)) {
      form.setValue('colors', [...colors, newColor])
      setNewColor('')
    }
  }

  const handleRemoveColor = (colorToRemove: string) => {
    form.setValue('colors', colors?.filter(color => color !== colorToRemove))
  }

  const handleAddSize = () => {
    if (newSize && !sizes?.includes(newSize)) {
      form.setValue('sizes', [...sizes, newSize])
      setNewSize('')
    }
  }

  const handleRemoveSize = (sizeToRemove: string) => {
    form.setValue('sizes', sizes?.filter(size => size !== sizeToRemove))
  }

  const handleRemoveImage = (imageToRemove: string) => {
    form.setValue('images', images?.filter(image => image !== imageToRemove))
  }

  return (
    <Form {...form}>
      <form
        method='post'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='Enter product slug'
                      className='pl-8'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => {
                        form.setValue('slug', toSlug(form.getValues('name')))
                      }}
                      className='absolute right-2 top-2.5 text-sm text-blue-500'
                    >
                      Generate
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product brand' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='listPrice'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>List Price</FormLabel>
                <FormControl>
                  <Input 
                    type='number'
                    placeholder='Enter product list price' 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Net Price</FormLabel>
                <FormControl>
                  <Input 
                    type='number'
                    placeholder='Enter product price' 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='countInStock'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Count In Stock</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Enter product count in stock'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Images Section */}
        <div>
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className='space-y-2 mt-2 min-h-48'>
                    <div className='flex flex-wrap gap-2'>
                      {images?.map((image: string) => (
                        <div key={image} className='relative'>
                          <Image
                            src={image}
                            alt='product image'
                            className='w-20 h-20 object-cover object-center -sm'
                            width={100}
                            height={100}
                          />
                          <button
                            type='button'
                            onClick={() => handleRemoveImage(image)}
                            className='absolute -top-2 -right-2 bg-red-500  p-0.5'
                          >
                            <X className='h-3 w-3 text-white' />
                          </button>
                        </div>
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue('images', [...images, res[0].url])
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: 'destructive',
                              description: `ERROR! ${error.message}`,
                            })
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Colors Section */}
        <div>
          <FormField
            control={form.control}
            name='colors'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Colors</FormLabel>
                <div className='flex flex-wrap gap-2 mb-2'>
                  {colors?.map((color) => (
                    <Badge 
                      key={color} 
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      {color}
                      <button
                        type='button'
                        onClick={() => handleRemoveColor(color)}
                        className='text-red-500'
                      >
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Add color'
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={handleAddColor}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Sizes Section */}
        <div>
          <FormField
            control={form.control}
            name='sizes'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Sizes</FormLabel>
                <div className='flex flex-wrap gap-2 mb-2'>
                  {sizes?.map((size) => (
                    <Badge 
                      key={size} 
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      {size}
                      <button
                        type='button'
                        onClick={() => handleRemoveSize(size)}
                        className='text-red-500'
                      >
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Add size'
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={handleAddSize}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Tags Section - Now with predefined options */}
      


<div>
  <FormField
    control={form.control}
    name='tags'
    render={({ field }) => (
      <FormItem className='w-full'>
        <FormLabel>Tags</FormLabel>
        <div className='flex flex-wrap gap-2 mb-2'>
          {field.value?.map((tag) => (
            <Badge 
              key={tag} 
              variant='outline'
              className='flex items-center gap-1'
            >
              {tag}
              <button
                type='button'
                onClick={() => {
                  form.setValue('tags', field.value?.filter(t => t !== tag) || [])
                }}
                className='text-red-500'
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ))}
        </div>
        <Select
          onValueChange={(value) => {
            if (value && !field.value?.includes(value)) {
              form.setValue('tags', [...(field.value || []), value])
            }
          }}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a tag to add" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {TAGS.map((tag) => (
              <SelectItem 
                key={tag} 
                value={tag}
                disabled={field.value?.includes(tag)}
              >
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
</div>



        <div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter product description'
                    className='resize-none min-h-[150px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name='isPublished'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-2'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Publish this product</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button
            type='submit'
            size='lg'
            disabled={form.formState.isSubmitting}
            className='w-full'
          >
            {form.formState.isSubmitting ? 'Submitting...' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm