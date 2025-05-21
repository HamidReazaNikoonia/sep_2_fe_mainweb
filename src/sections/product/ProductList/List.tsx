import ProductCard from '@/components/Card/ProductCard';
import {IProduct} from '@/types/Product';

interface ListProps {
  products: IProduct[]
}

const sampleProduct =  {
  id: "number",
  title: 'محصول',
  subtitle: "توضیحات محصول در این قسمت قرار میگیرد",
  meta_title: "",
  meta_description: "",
  slug: "string",
  description: "توضیحات",
  brand: "string",
  average_rating: 3,
  countInStock: 20,
  is_available: true,
  status: true,
  qr_code: "string",
  price: 50000,

}

export default function List({ products }: ListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-0">
      {products?.length !== 0 && products.map(product => (
        <ProductCard product={sampleProduct} key={product._id} />
      ))}

      {products?.length === 0 && (
        <div className="col-span-3 mt-8 text-center">
          <p className="text-gray-500">محصولی وجود ندارد</p>
        </div>
      )}
    </div>
  )
}

