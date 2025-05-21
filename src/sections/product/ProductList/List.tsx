import ProductCard from '@/components/Card/ProductCard';
import {IProduct} from '@/types/Product';

interface ListProps {
  products: IProduct[]
}

export default function List({ products }: ListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-0">
      {products?.length !== 0 && products.map(product => (
        <ProductCard product={product} key={product._id} />
      ))}

      {products?.length === 0 && (
        <div className="col-span-3 mt-8 text-center">
          <p className="text-gray-500">محصولی وجود ندارد</p>
        </div>
      )}
    </div>
  )
}

