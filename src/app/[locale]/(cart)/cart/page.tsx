'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from 'next/image'

import AddressSelector from '@/sections/cart/AddressSelector';
// utils

// components
import LoadingSpinner from '@/components/LoadingSpiner';


import { filterPriceNumber } from '@/utils/Helpers';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';
import clsx from 'clsx';

// assets
// import emptyCartSvg from '@/public/assets/svg/empty_cart.svg';


// API
import { getUserCartRequest, updateUserCartRequest, deleteProductInCartRequest } from '@/API/cart';
import { getUserAddressRequest, submitAddresRequest } from '@/API/order/address';


// types
import { Address, AddressResponse } from '@/types/Product';
import toast from 'react-hot-toast';
import CartItemComponent from '@/sections/cart/CartList';
import { submitCartToCreateOrderRequest } from '@/API/order/payment';
import LoadingButton from '@/components/LoadingButton';
import useAuth from '@/hooks/useAuth';




const initialCartItems = [
  { id: 1, name: 'Wireless Earbuds', price: 79.99, quantity: 2, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Smart Watch', price: 129.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },

  { id: 3, name: 'Portable Charger', price: 39.99, quantity: 3, image: '/placeholder.svg?height=80&width=80' },
]

const addresses = [
  { id: 1, name: 'خانه', street: 'پردیسان, استقلال ۲ - بلوک حضرت الخدیجه - واحد ۲ پلاک ۶ منزل آقای نیکونیا ی عزیز', city: 'قم', state: '', zip: '12345' },
  { id: 2, name: 'Work', street: '456 Office Blvd', city: 'Workville', state: 'NY', zip: '67890' },
]


// interface Address {
//   _id: number
//   name: string
//   street: string
//   city: string
//   state: string
//   zip: string
// }




export default function ShoppingCart() {
  // const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [selectedAddress, setSelectedAddress] = useState<AddressResponse | null>(null)
  const [cartItemFiltered, setcartItemFiltered] = useState([]);

  // we have 2 kind of products [Product, course]
  // when `isProductExistInTheList` is true, it means there are actuall product in the cart
  // then we need to appear address UI and get the Address from user
  const [isProductExistInTheList, setisProductExistInTheList] = useState(false);
  const [totalPriceValue, settotalPriceValue] = useState(0);
  const [quantityChangeLoading, setquantityChangeLoading] = useState<string | null>(null)
  const [submitCartIsLoading, setsubmitCartIsLoading] = useState(false);
  const [taxPrice, settaxPrice] = useState();

  const queryClient = useQueryClient();
  // const router = useRouter();


  const isMobileScreen = useResponsiveEvent(768, 200);


  // const { isAuthenticated, user } = useAuth();

  // useEffect(() => {
  //   if (!isAuthenticated || !user) {
  //     router.push('/sign-in');
  //   }
  // }, [])


  // Get Cartd Items from API
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryFn: async () => getUserCartRequest(),
    queryKey: ["cart"], //Array according to Documentation
  });


  // Get User Address From API
  const { data: addressData, isLoading: addressIsLoading, isError: addressIsError, isSuccess: addressIsSuccess } = useQuery({
    queryFn: async () => getUserAddressRequest(),
    queryKey: ["order::address"], //Array according to Documentation
  });


  const mutation = useMutation({
    mutationFn: updateUserCartRequest,
    onSuccess: () => {
      // @ts-expect-error
      queryClient.invalidateQueries("cart");
      setquantityChangeLoading(null);

    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteProductInCartRequest,
    onSuccess: () => {
      // @ts-expect-error
      queryClient.invalidateQueries("cart");

    },
  })


  const submitAddressMutation = useMutation({
    mutationFn: submitAddresRequest,
    onSuccess: (res) => {
      // @ts-expect-error
      queryClient.invalidateQueries("order::address");
      if (res && res.billingAddress) {
        toast.success('آدرس شما ثبت شد');

        setSelectedAddress(res || addressData[0]);
      }
      console.log({ response: res })

    },
  });


  const submitCartToCreateOrderMutation = useMutation({
    mutationFn: submitCartToCreateOrderRequest,
    onSuccess: (response) => {
      // @ts-expect-error
      queryClient.invalidateQueries("order");

      // response = { newOrder, payment, transaction  }
      if (response) {
        // order created successfully
        if (!response.newOrder) {
          toast.error('خطایی رخ داده')
          setsubmitCartIsLoading(false);
        }

        // navigate to the bank
        if (response.payment && response.payment.code === 100) {
          toast.success('شما در حال انتقال به بانک هستید');
          window && window.location.replace(response.payment.url);
        }


      } else {
        toast.error('خطای سرور')
        setsubmitCartIsLoading(false);
      }
      console.log({ response: response })

    },
  });

  // Address Efects
  useEffect(() => {

    if (addressIsSuccess) {
      console.log({ address: addressData });
      // setSelectedAddress(addressData[0])
    }


  }, [addressData, addressIsSuccess])


  // useEffect(() => {



  // }, [submitCartToCreateOrderMutation.isPending])




  useEffect(() => {

    if (submitAddressMutation.isSuccess) {
      toast.success('آدرس شما با موفقیت ثبت شد')
    }


    if (submitAddressMutation.isError) {
      toast.error('متاسفانه آدرس شما ثبت نشد')
      toast.error('مشکلی پیش آمده , دوباره امتحان کنید')
    }

  }, [submitAddressMutation.isSuccess, submitAddressMutation.isError])



  useEffect(() => {
    if (isSuccess && data && data._id) {


      settotalPriceValue(data.totalPrice || 0);
      const cartItems = data.cartItem.map(item => {
        return {
          ...(item.productId && item.productId),
          ...(item.courseId && item.courseId),
          ...item
        }
      });

      // check if `Product` Exist in the cartitems
      const hasProductItemProperty = data.cartItem.some(item => 'productId' in item);
      setisProductExistInTheList(hasProductItemProperty);

      setcartItemFiltered(cartItems);
      console.log({ iiii: cartItems })
    }


  }, [data, isSuccess])




  const updateQuantity = (id: string, newQuantity: number) => {
    // setCartItems(prevItems =>
    //   prevItems.map(item =>
    //     item.id === id ? { ...item, quantity: Math.max(newQuantity, 0) } : item
    //   )
    // )
    console.log({ aaa: id })
    setquantityChangeLoading(id);
    mutation.mutate({ productId: id, quantity: newQuantity });
  }

  const removeItem = (id: string) => {
    // setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    deleteItemMutation.mutate({ cartItemId: id })
  }


  const submitAddressFormHandler = (address: Address) => {

    // Submit API
    submitAddressMutation.mutate({
      addressLine1: address.address,
      state: address.state,
      city: address.city,
      postalCode: address.postalCode,
      title: address.title
    })


    console.log({ es: address })

  }


  // Payment process
  const continuePaymentHandler = () => {
    console.log({ selectedAddress, data });
    setsubmitCartIsLoading(true);
    // submit order API endpoint
    // @params cartId
    // @params shippingAddress
    if (!data || !data?._id) {
      setsubmitCartIsLoading(false);
      toast.error('مشکلی به وجود آمده, لطفا صفحه را رفرش کنید');
      return false;
    }



    // Product Exist in The Cart Items
    // Means we should Validate Address 
    if (isProductExistInTheList) {
      if (!selectedAddress || !selectedAddress?._id) {
        setsubmitCartIsLoading(false);
        toast.error('مشکلی پیش آمده, لطفا صفحه را رفرش کنید');
        toast.error('آدرس به درستی انتخاب نشده');
        return false;
      }
    }


    submitCartToCreateOrderMutation.mutate({ cartId: data?._id, ...(selectedAddress && {shippingAddress: selectedAddress._id}) });
    toast.success('سفارش در حال ارسال');
    return true;
  }

  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // )
  const tax = totalPriceValue * 0.08 // Assuming 8% tax rate
  const shippingFee = 5000
  const total = totalPriceValue + tax;

  const isDataExist = isSuccess && data && cartItemFiltered;
  const isAddressDataExist = addressIsSuccess && addressData && Array.isArray(addressData);

  return (
    <div className="w-full h-svh bg-gradient-to-t from-slate-900 to-slate-700 min-h-[80vh]">
      <div className="mx-auto px-4 py-8">
        {/* <h2 dir='rtl' className="text-3xl text-right font-bold mb-6 text-gray-800">
        <X size={34} />
        </h2> */}
        <div className=''>
          {isDataExist ? (
            <>
              {cartItemFiltered && cartItemFiltered.length === 0 ? (
                <div className="text-center py-12 bg-none ">
                  <div className='flex justify-center'>
                    
                  </div>
                  <p className="text-xl text-gray-100 mb-12 mt-6">سبد شما خالی میباشد</p>
                  <Link href="/">
                    <button className="w-60 cursor-pointer  bg-purple-900 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200">
                      ادامه خرید
                    </button>
                  </Link>
                </div>
              ) : (
                // List of Product In The Cart 
                <div className="flex flex-col md:flex-row gap-8 mr-0 lg:mr-8">
                  <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-md text-right font-semibold mb-4">لیست محصولات</h3>
                    <div className="space-y-4">
                      {(isDataExist && cartItemFiltered) && cartItemFiltered.map(item => (
                        <CartItemComponent
                          quantityLoading={item?.productId?._id === quantityChangeLoading}
                          key={item._id}
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeItem}
                        />
                      ))}
                    </div>
                  </div>

                  {/* SideBar */}
                  <div className={clsx("lg:w-1/3 space-y-3 right-2 z-30", !isMobileScreen && 'fixed')} >
                    {isProductExistInTheList && (
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <AddressSelector
                          isAddressDataExist={isAddressDataExist}
                          addresses={addressData}
                          onSubmitAddressForm={submitAddressFormHandler}
                          selectedAddress={selectedAddress}
                          onSelectAddress={setSelectedAddress}
                        />

                      </div>
                    )}
                    <div className="bg-white rounded-xl shadow-lg p-6 text-right">
                      <h3 className="text-md font-semibold mb-4">فاکتور</h3>
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex justify-between">
                          <span>
                            <div dir='rtl' className="flex items-center">
                              {filterPriceNumber(totalPriceValue)}<span className="text-sm mr-1">تومان</span>
                            </div>
                          </span>
                          <span className=''>جمع کل</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            <div dir='rtl' className="flex items-center">
                              {filterPriceNumber(tax)}<span className="text-sm mr-1">تومان</span>
                            </div>
                          </span>
                          <span className=''> مالیات</span>
                        </div>
                        {/* <div className="flex justify-between">
                          <span>
                            <div dir='rtl' className="flex items-center">
                              {filterPriceNumber(shippingFee)}<span className="text-sm mr-1">تومان</span>
                            </div>
                          </span>
                          <span className=''>هزینه ارسال</span>
                        </div> */}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold text-lg text-[#137f3b]">
                            <span>
                              <div dir='rtl' className="flex items-center">
                                {filterPriceNumber(total)}<span className="text-sm mr-1">تومان</span>
                              </div>
                            </span>
                            <span>جمع کل</span>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col  space-y-2  mt-4'>
                        {/* <button
                    onClick={continuePaymentHandler}
                    className=" w-full md:w-60 cursor-pointer  bg-purple-800 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={(!selectedAddress && isProductExistInTheList)}
                  >
                    ادامه خرید
                  </button> */}
                        <LoadingButton onClick={continuePaymentHandler} isLoading={submitCartIsLoading} disabled={(!selectedAddress && isProductExistInTheList)} >
                          ادامه خرید
                        </LoadingButton>
                        <Link href="/">
                        <button
                          className="w-full  cursor-pointer bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                          بازگشت
                        </button>
                        </Link>
                      </div>
                      {(!selectedAddress && isProductExistInTheList) && (
                        <p className="text-xs text-red-500 mt-4">
                          لطفا یک آدرس انتخاب کنید
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </div>
  )
}

