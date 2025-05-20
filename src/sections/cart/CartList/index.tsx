import React, { useEffect, useState } from 'react'
import { Plus, Minus, Trash2 } from 'lucide-react'


import CustomImage from "@/components/CustomImage";
import { filterPriceNumber } from "@/utils/Helpers";
import clsx from 'clsx';


interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productId?: string;
  is_available?: boolean;
  course_status?: boolean; 
}


const CartItemComponent: React.FC<{
  item: CartItem,
  quantityLoading?: boolean;
  incrementButtonLoading?: boolean,
  decrementButtonLoading?: boolean,
  onUpdateQuantity: (_id: string, newQuantity: number) => void
  onRemove: (id: string) => void
}> = ({ item, onUpdateQuantity, onRemove, incrementButtonLoading, decrementButtonLoading, quantityLoading }) => {
  
  const isItemAvailabel = !!(item?.productId ? item?.is_available : item?.course_status);
  const wrapperClasess = "flex items-center space-x-4 py-6 border-b border-gray-200 last:border-b-0"
  return (
    <div className={clsx(wrapperClasess, (!isItemAvailabel && "opacity-50"))}>
      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
        <CustomImage fileName={item?.thumbnail?.file_name} className="object-cover" src={''} alt={''} />
      </div>
      <div className="flex-grow leading-10">
        <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
        {isItemAvailabel ? (
          <div className="text-gray-600">
          <span>
            <div dir='rtl' className="flex items-center justify-end text-left">
              {filterPriceNumber(item.price)}<span className="text-sm mr-1">تومان</span>
            </div>
          </span>
        </div>
        ) : (
          <div className='text-purple-950 text-sm'> ناموجود </div>
        )}
      </div>

      {(!!item.productId && isItemAvailabel) && (
        <>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onUpdateQuantity(item?.productId._id, item.quantity - 1)}
              disabled={(item.quantity <= 1 || quantityLoading)}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors duration-200"
              aria-label="Decrease quantity"
            >
            {(decrementButtonLoading || quantityLoading) ? (<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>) : (
              <Minus className="w-4 h-4 text-gray-600" />
            )}
            </button>
            <span className="font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item?.productId._id, item.quantity + 1)}
              disabled={quantityLoading}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors duration-200"
              aria-label="Increase quantity"
            >
               {(incrementButtonLoading || quantityLoading) ? (<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>) : (
              <Plus className="w-4 h-4 text-gray-600" />
            )}
            </button>
          </div>


        </>
      )}

      <button
        onClick={() => onRemove(item._id)}
        className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5 text-red-500" />
      </button>


    </div>
  )
}


export default CartItemComponent;