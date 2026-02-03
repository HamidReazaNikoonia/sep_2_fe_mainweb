import {IProduct} from '@/types/Product'

export interface Order {
  paymentStatus: string
  total: any
  total_discount_price: boolean
  deliveryFees: any
  taxes: any
  used_wallet_amount: boolean
  status: string
  totalAmount: number
  shippingAddress: string
  products: IProduct[]
  reference: string
  createdAt: string
  _id:  | null | undefined
  data?: {
    _id: string
    product: string
    date: string
    total: string
    status: string
    shippingAddress: string
    totalAmount: number

  }
}
