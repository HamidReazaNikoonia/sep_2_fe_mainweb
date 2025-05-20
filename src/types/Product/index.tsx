export interface IProduct {
  _id: string
  subtitle: string
  meta_title: string
  meta_description: string
  slug: string
  description: string
  brand: string
  average_rating: number
  countInStock: number
  is_available: boolean
  status: boolean
  qr_code: string
  quantity?: number,
  product_details?: {
    variants?: string
      width?: number,
      height?: number,
      length?: number,
      origin_country?: string,
      material?: string,

  }
  tag: [any]

  images: [any]
  category: any
  thumbnail: any;
  title: string
  price: number
  tags: string[]
  discountable: {
    status: boolean,
    percent: number
  }
}


export interface Address {
  _id?: number
  title?: string
  address?: string
  addressLine1?: string;
  city: number
  state: string
  postalCode: string
}


export interface AddressResponse {
    billingAddress: {
        country: string,
        addressLine1: string,
        city: number,
        state: number,
        postalCode: string
    },
    _id: string,
    customer: string,
    createdAt: string,
    updatedAt: string,
    __v: any

}