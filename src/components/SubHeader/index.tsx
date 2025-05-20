'use client'
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

import { SheetDemo } from './SideDrawer';

import { NavigationMenuDemo } from './NavigationHeader';
import { useCartStore } from "@/_store/Cart";
import { getUserCartRequest } from "@/API/cart";
// import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";




export default function SubHeader() {
  // const [activeCategory, setActiveCategory] = useState(null);
  const [productCountBadge, setproductCountBadge] = useState(0);

  const router = useRouter();
  const { isAuthenticated } = useAuth();


  const { data } = useQuery({
    queryFn: async () => getUserCartRequest(),
    queryKey: ["cart"], //Array according to Documentation
  });




  const cart = useCartStore(state => state.cart);


  useEffect(() => {
    if (data?.cartItem) {
      setproductCountBadge(data?.cartItem?.length || 0);
    } else if (data?.length === 0) {
      setproductCountBadge(0);
    } else if (cart) {
      if (Array.isArray(cart) && cart.length !== 0) {
        // @ts-ignore
        setproductCountBadge(cart.length ? cart.length : 0);
      }
    }
  }, [data, cart]);


  const goToCartHandler = () => {
    if (isAuthenticated) {
      router.push('/cart');
    } else {
      toast.error("برای مشاهده سبد خرید ابتدا وارد حساب کاربری خود شوید");
      router.push('/sign-in');
    }
  }



  return (
    <div className="bg-white border-b-4 py-4 px-8 flex justify-between items-center shadow-xl">

      <div onClick={goToCartHandler}>
        <button className="flex text-sm items-center gap-2 border py-2 px-4 rounded-3xl text-white hover:text-gray-200 hover:border-green-600" style={{ background: "linear-gradient(90deg,#4dba64,#25a06f)" }} >
          سبد خرید ({productCountBadge}) |  <ShoppingCart size={18} />
        </button>
      </div>


      <div className="hidden md:flex  gap-8">
        <NavigationMenuDemo />
      </div>

      <div className="flex md:hidden">
        <SheetDemo />
      </div>

      {/* <Button className="rounded-3xl" variant="outline" >
        موضوعات
        <List size={18} />
      </Button> */}

      {/* LOGO */}
      <div className="hidden md:flex text-xl">
        LOGO
      </div>

    </div>
  );
};