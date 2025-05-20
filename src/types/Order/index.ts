import {IProduct} from '@/types/Product'

export interface Order {
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
