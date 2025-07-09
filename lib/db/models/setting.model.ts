import { ISettingInput } from '@/types'
import { Document, Model, model, models, Schema } from 'mongoose'

export interface ISetting extends Document, ISettingInput {
  _id: string
  createdAt: Date
  updatedAt: Date
}

const settingSchema = new Schema<ISetting>(
  {
    common: {
      pageSize: { type: Number, required: true, default: 9 },
      isMaintenanceMode: { type: Boolean, required: true, default: false },
      freeShippingMinPrice: { type: Number, required: true, default: 35 },
      defaultTheme: { type: String, required: true, default: 'Star' },
      defaultColor: { type: String, required: true, default: 'Green' },
    },
    site: {
      name: { type: String, required: true, default: 'kspyn' },
      url: {
        type: String,
        required: true,
        default: 'https://kspyn-ecom.vercel.app',
      },
      logo: {
        type: String,
        required: true,
        default: 'https://utfs.io/f/TnUUA3HpYVQ0ACiB017a8bILCZlWMTrzpPdoQwiGh3xSX5Oj',
      },
      slogan: { type: String, required: true, default: 'From Kerala, with vibes.' },
      description: {
        type: String,
        required: true,
        default: 'From local to global. KSPYN brings Kerala’s flavor into the digital mall scene.”',
      },
      keywords: {
        type: String,
        required: true,
        default: 'Kerala online store, Payyanur ecommerce, Gen Z fashion, budget shopping India, trendy gadgets Kerala, KSPYN store, Next.js ecommerce, chill shopping site, Malayalam online store, cool products India, local to global shopping, desi Amazon alternative, affordable online shopping Kerala, Mallu startup ecommerce, online deals Kerala',
      },
      email: { type: String, required: true, default: 'admin@example.com' },
      phone: { type: String, required: true, default: '+1 (123) 456-7890' },
      author: { type: String, required: true, default: 'Next Ecommerce' },
      upiId: { type: String, default: '',required:true},
      copyright: {
        type: String,
        required: true,
        default: '2025 KSPYN',
      },
      address: {
        type: String,
        required: true,
        default: 'Kerala',
      },
    },
    carousels: {
      type: [
        {
          title: { type: String, required: true },
          url: { type: String, required: true, unique: true },
          image: { type: String, required: true },
          buttonCaption: { type: String, required: true },
        },
      ],
      default: () => [
        {
          title: 'Best for you.',
          url: '/search?tag=new-arrival',
          image: 'https://utfs.io/f/TnUUA3HpYVQ0y6drOfE5zVdCDnSAqa5uZWXk1r7BJYovGKT0',
          buttonCaption: 'Grab offer.',
        },
      ],
    },
    availableLanguages: {
      type: [
        {
          name: {
            type: String,
            required: true,
            set: (value: string) => Buffer.from(value).toString('utf8'),
          },
          code: { type: String, required: true },
        },
      ],
      default: () => [
        { name: 'English', code: 'en-US' },
        { name: 'العربية', code: 'ar' },
        { name: 'Malayalam', code: 'ml' },
      ],
    },
    defaultLanguage: { type: String, required: true, default: 'en-US' },
    availableCurrencies: {
      type: [
        {
          name: {
            type: String,
            required: true,
            set: (value: string) => Buffer.from(value).toString('utf8'),
          },
          code: { type: String, required: true },
          convertRate: { type: Number, required: true },
          symbol: {
            type: String,
            required: true,
            set: (value: string) => Buffer.from(value).toString('utf8'),
          },
        },
      ],
      default: () => [
        {
          name: 'Indian Rupees',
          code: 'INR',
          convertRate: 1,
          symbol: '₹',
        },
      ],
    },
    defaultCurrency: { type: String, required: true, default: 'INR' },
    availablePaymentMethods: {
      type: [
        {
          name: { type: String, required: true },
          commission: { type: Number, required: true, default: 0 },
        },
      ],
      default: () => [
        { name: 'Cash On Delivery', commission: 0 },
        { name: 'Online', commission: 0 },
      ],
    },
    defaultPaymentMethod: { type: String, required: true, default: 'Cash On Delivery' },
    availableDeliveryDates: {
      type: [
        {
          name: { type: String, required: true },
          daysToDeliver: { type: Number, required: true },
          shippingPrice: { type: Number, required: true },
          freeShippingMinPrice: { type: Number, required: true },
        },
      ],
      default: () => [
        {
          name: 'Tomorrow',
          daysToDeliver: 1,
          shippingPrice: 12.9,
          freeShippingMinPrice: 0,
        },
        {
          name: 'Next 3 Days',
          daysToDeliver: 3,
          shippingPrice: 6.9,
          freeShippingMinPrice: 0,
        },
        {
          name: 'Next 5 Days',
          daysToDeliver: 5,
          shippingPrice: 4.9,
          freeShippingMinPrice: 35,
        },
      ],
    },
    defaultDeliveryDate: { type: String, required: true, default: 'Tomorrow' },
  },
  {
    timestamps: true,
  }
)

const Setting =
  (models.Setting as Model<ISetting>) ||
  model<ISetting>('Setting', settingSchema)

export default Setting
