import Link from 'next/link'
import Pagination from '@/components/shared/pagination'
import ProductCard from '@/components/shared/product/product-card'
import { Button } from '@/components/ui/button'
import {
  getAllCategories,
  getAllProducts,
  getAllTags,
} from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'
import ProductSortSelector from '@/components/shared/product/product-sort-selector'
import { getFilterUrl, toSlug } from '@/lib/utils'
import Rating from '@/components/shared/product/rating'
import CollapsibleOnMobile from '@/components/shared/collapsible-on-mobile'
import { getTranslations } from 'next-intl/server'

const sortOrders = [
  { value: 'price-low-to-high', name: 'Price: Low to high' },
  { value: 'price-high-to-low', name: 'Price: High to low' },
  { value: 'newest-arrivals', name: 'Newest arrivals' },
  { value: 'avg-customer-review', name: 'Avg. customer review' },
  { value: 'best-selling', name: 'Best selling' },
]

const prices = [
  { name: '₹100 - ₹500', value: '100-500' },
  { name: '₹500 - ₹1000', value: '500-1000' },
  { name: '₹1000 - ₹5000', value: '1000-5000' },
  { name: '₹5000+', value: '5000-100000' },
]

export default async function SearchPage(props: {
  searchParams: Promise<{
    q: string
    category: string
    tag: string
    price: string
    rating: string
    sort: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams
  const {
    q = 'all',
    category = 'all',
    tag = 'all',
    price = 'all',
    rating = 'all',
    sort = 'best-selling',
    page = '1',
  } = searchParams

  const params = { q, category, tag, price, rating, sort, page }

  const categories = await getAllCategories()
  const tags = await getAllTags()
  const data = await getAllProducts({
    category,
    tag,
    query: q,
    price,
    rating,
    page: Number(page),
    sort,
  })
  const t = await getTranslations()

  return (
    <div className="container relative mx-auto  py-6">
      {/* Results Header */}
      <div className="mb-4 ">
        <div className="sticky top-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:px-0 px-[24px]">
          <div className="text-sm">
            {data.totalProducts === 0 ? (
              t('Search.No')
            ) : (
              <div className='flex flex-col gap-[1px]'>

                <span className="font-semibold text-2xl">{t('Search.Results')} ({data.totalProducts})</span> 
                <span className="font-medium text-muted-foreground">{data.from}-{data.to} Displayed</span>
              </div>
            )}
            
            {(q !== 'all' && q !== '') ||
            category !== 'all' ||
            tag !== 'all' ||
            rating !== 'all' ||
            price !== 'all' ? (
              <span className="text-muted-foreground">
                {' '}{t('Search.for')}{' '}
                {q !== 'all' && q !== '' && <span className="font-medium">&quot;{q}&quot;</span>}
                {category !== 'all' && (
                  <span className="ml-1">
                    {t('Search.Category')}: <span className="font-medium">{category}</span>
                  </span>
                )}
                {tag !== 'all' && (
                  <span className="ml-1">
                    {t('Search.Tag')}: <span className="font-medium">{tag}</span>
                  </span>
                )}
                {price !== 'all' && (
                  <span className="ml-1">
                    {t('Search.Price')}: <span className="font-medium">
                      {prices.find(p => p.value === price)?.name}
                    </span>
                  </span>
                )}
                {rating !== 'all' && (
                  <span className="ml-1">
                    {t('Search.Rating')}: <span className="font-medium">{rating}+</span>
                  </span>
                )}
              </span>
            ) : null}

            {((q !== 'all' && q !== '') ||
              category !== 'all' ||
              tag !== 'all' ||
              rating !== 'all' ||
              price !== 'all') && (
              <Button variant="link" size="sm" className="ml-2 p-0 h-auto" asChild>
                <Link href="/search">{t('Search.Clear')}</Link>
              </Button>
            )}
          </div>

          <ProductSortSelector
            sortOrders={sortOrders}
            sort={sort}
            params={params}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid  md:grid-cols-5 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <CollapsibleOnMobile title={t('Search.Filters')}>
            <div className="space-y-6 ">
              {/* Categories */}
              <div>
                <h3 className="font-bold mb-3">{t('Search.Department')}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      className={`block py-1 hover:text-primary ${
                        ('all' === category || '' === category) && 'text-primary font-medium'
                      }`}
                      href={getFilterUrl({ category: 'all', params })}
                    >
                      {t('Search.All')}
                    </Link>
                  </li>
                  {categories?.map((c: string) => (
                    <li key={c}>
                      <Link
                        className={`block py-1 hover:text-primary ${
                          c === category && 'text-primary font-medium'
                        }`}
                        href={getFilterUrl({ category: c, params })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-bold mb-3">{t('Search.Price')}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      className={`block py-1 hover:text-primary ${
                        'all' === price && 'text-primary font-medium'
                      }`}
                      href={getFilterUrl({ price: 'all', params })}
                    >
                      {t('Search.All')}
                    </Link>
                  </li>
                  {prices?.map((p) => (
                    <li key={p.value}>
                      <Link
                        className={`block py-1 hover:text-primary ${
                          p.value === price && 'text-primary font-medium'
                        }`}
                        href={getFilterUrl({ price: p.value, params })}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-bold mb-3">{t('Search.Customer Review')}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      className={`block py-1 hover:text-primary ${
                        'all' === rating && 'text-primary font-medium'
                      }`}
                      href={getFilterUrl({ rating: 'all', params })}
                    >
                      {t('Search.All')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`block py-1 hover:text-primary ${
                        '4' === rating && 'text-primary font-medium'
                      }`}
                      href={getFilterUrl({ rating: '4', params })}
                    >
                      <div className="flex items-center">
                        <Rating size={4} rating={4} />
                        <span className="ml-2">{t('Search.& Up')}</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-bold mb-3">{t('Search.Tag')}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      className={`block py-1 hover:text-primary ${
                        ('all' === tag || '' === tag) && 'text-primary font-medium'
                      }`}
                      href={getFilterUrl({ tag: 'all', params })}
                    >
                      {t('Search.All')}
                    </Link>
                  </li>
                  {tags?.map((t: string) => (
                    <li key={t}>
                      <Link
                        className={`block py-1 hover:text-primary ${
                          toSlug(t) === tag && 'text-primary font-medium'
                        }`}
                        href={getFilterUrl({ tag: t, params })}
                      >
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleOnMobile>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-4">
          {/* <div className="mb-6">
            <h2 className="text-xl font-bold">{t('Search.Results')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('Search.Check each product page for other buying options')}
            </p>
          </div> */}

          {data.products.length === 0 ? (
            <div className="py-12 text-center">
              <p>{t('Search.No product found')}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.products?.map((product: IProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {data.totalPages > 1 && (
                <div className="mt-8">
                  <Pagination page={page} totalPages={data.totalPages} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}