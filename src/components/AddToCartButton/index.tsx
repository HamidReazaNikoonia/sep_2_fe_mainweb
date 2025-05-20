'use client'
import React, {useState, useEffect} from 'react';
import { ShoppingCart, Plus } from 'lucide-react';


import {useCartStore} from '@/_store/Cart';
import toast from 'react-hot-toast';
import { IProduct } from '@/types/Product';

export default function AddToCartButton({productIsAvailable, product}: {productIsAvailable: boolean, product: IProduct}) {
  const [isClicked, setIsClicked] = useState(false);

  const addToCart = useCartStore(state => state.addToCart)

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isClicked) {
      timer = setTimeout(() => {
        setIsClicked(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isClicked]);

  const addProductToCart = (e: any) => {
    e.preventDefault();
    setIsClicked(true);
    toast.success('محصول به سبد خرید شما اضافه شد'); // Displays a success message
    addToCart(product);
    console.log({product});
  }


  return (
    <>
    {productIsAvailable && (
        <a
        onClick={addProductToCart}
        href="#"
        className={`flex items-center rounded-md ${
          isClicked ? 'bg-green-500 text-gray-800' : 'green-gradient-bg text-white hover:bg-gray-700'
        } px-16 py-2.5 text-center text-sm font-medium  focus:outline-none focus:ring-1 focus:ring-blue-300 transition-colors duration-300`}
      >
        {isClicked ? (
          <>
          <Plus className="mr-2" size={19} />
            اضافه به سبد خرید
          </>
          
        ) : (
          <>
            <ShoppingCart className="mr-2" size={19} />
            خرید
          </>
        )}
      </a>
      )}
    </>
  )
}
