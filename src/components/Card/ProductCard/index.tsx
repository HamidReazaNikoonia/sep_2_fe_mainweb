import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { Star, ShoppingCart } from 'lucide-react';

import { useCartStore } from '@/_store/Cart';
import useAuth from '@/hooks/useAuth';

import { IProduct } from '@/types/Product';
import Link from 'next/link';
import Image from 'next/image';


// import product_placeholder from "@/public/assets/images/product_placeholder.png";
// import sampleImage from "@/public/assets/images/s3.jpg";
import sampleImage from "@/public/assets/images/vialon.webp";

import { useMutation, useQueryClient } from "@tanstack/react-query";


// API
import { addProductToCartRequest } from '@/API/cart';


const calculateDiscountByPercentage = (currentPrice: number, discountPercentage: number): number => {
  return currentPrice * ((100 - discountPercentage) / 100);
}

// interface Product {
//   id: number
//   subtitle: string
//   meta_title: string
//   meta_description: string
//   slug: string
//   description: string
//   brand: string
//   average_rating: number
//   countInStock: number
//   is_available: boolean
//   status: boolean
//   qr_code: string
//   product_details?: {
//     variants?: string
//       width?: number,
//       height?: number,
//       length?: number,
//       origin_country?: string,
//       material?: string,

//   }
//   tag: [any]

//   images: [any]
//   category: any
//   thumbnail: any;
//   title: string
//   price: number
//   tags: string[]
// }

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

export default function ProductCard({ product }: { product: IProduct }) {
  const [isClicked, setIsClicked] = useState(false);

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: addProductToCartRequest,
    onSuccess: () => {
      // @ts-expect-error
      queryClient.invalidateQueries("cart");
    },
  });


  const { isAuthenticated, user } = useAuth();

  const addToCartInLocalStorage = useCartStore(state => state.addToCart);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isClicked) {
      timer = setTimeout(() => {
        setIsClicked(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isClicked]);


  const addProductToCartHandler = (e: any) => {
    e.preventDefault();
    setIsClicked(true);
    toast.success('محصول به سبد خرید شما اضافه شد'); // Displays a success message

    // if user authenticated, add product to cart in database
    // Send a request to the server to add the product to the cart
    if (isAuthenticated) {
      console.log('Add product to cart in database');
      console.log({product})
      mutation.mutate({ productId: product?.id, quantity: 1 });
    } else {
      // Add product to cart in local storage
      addToCartInLocalStorage(product);
    }


    console.log({ product });
  }

  return (
    <Link href={product?.id ? `/product/${product?.id}` : '/product/674b5414a7fc7c43af15f67a'} >
      <div className="relative w-full overflow-hidden rounded-lg bg-white shadow-md cursor-pointer hover:opacity-80">
        <div className=' relative w-full'>
          <Image width="256" height="256" className=" rounded-t-lg " src={product?.thumbnail?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${product?.thumbnail?.file_name}` : sampleImage} alt={product.title} />
        </div>
        {/* If product not exist */}
        {!product?.is_available && <span className="absolute left-0 top-0 w-28 -translate-x-6 translate-y-4 -rotate-45 bg-black text-center text-xs text-white">ناموجود</span>}
        {(product?.is_available && product?.discountable?.status) && <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-red-500 text-center text-xs text-white">
          %{product?.discountable.percent.toLocaleString('ar-EG')} OFF
        </span>}

        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h2 className="text-xl font-semibold text-right tracking-tight text-slate-900">
              {product.title}
            </h2>

            <h5 className='text-xs font-thin text-right mt-2 mb-4 text-slate-900 leading-6'>{product.subtitle}</h5>
          </a>
          <div className="mt-2.5 mb-5 flex items-center">
            <span className="mr-2 pt-1 rounded bg-yellow-300 text-black px-2.5 py-0.5 text-xs font-semibold">{(product?.average_rating || 0).toLocaleString('fa') || 0}</span>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                strokeWidth={1}
                size={18}
                fill={index < product.average_rating ? "#facc15" : "gray"}
                stroke="none"
              />
            ))}
            {/* <Star  stroke='gray' fill='none' size={18} />       */}
          </div>
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <div className='border-2 border-slate-300 text-center py-2 border-dashed w-full'>
              <div className="flex justify-center text-lg font-bold items-center text-slate-900">
                {product?.is_available && <span className='mr-1 text-sm'>تومان</span>}
                {product?.is_available ? (<span>{product?.price_real?.toLocaleString('ar-EG')}</span>) : 'ناموجود'}
              </div>
              {(product?.discountable?.status && product?.is_available) && (<span className=" inline-block text-sm text-slate-900 line-through">
                {calculateDiscountByPercentage(product.price_real, product?.discountable.percent).toLocaleString('ar-EG')}
              </span>)}

            </div>
            {product?.is_available && (
              <a
                onClick={addProductToCartHandler}
                href="#"
                className={`flex justify-center items-center rounded-md ${isClicked ? 'bg-green-500' : 'bg-slate-900 hover:bg-gray-700'
                  } px-4 w-full py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors duration-300`}
              >
                {isClicked ? (
                  'اضافه به سبد'
                ) : (
                  <>
                    <ShoppingCart className="mr-2" size={19} />
                    خرید
                  </>
                )}
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
