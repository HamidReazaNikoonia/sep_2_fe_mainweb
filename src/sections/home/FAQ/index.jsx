import { index } from 'drizzle-orm/mysql-core'
import React from 'react'
// import { ChevronsLeft, ClipboardList } from 'lucide-react';


const data = [
  {
    question: 'روش شرکت در دوره های آکادمی  چگونه است؟',
    answer: `ابتدا دوره مورد نظر خود را انخاب کنید وروی آن کلیک کنید تا به صفحع دورع منتقل شود بعد از این که از شرکت در دوره مطمعن شدید روی گزینه شرکت در دوره کلیک کنید که در ادامه دورع به سبد خرید شما اضافه می شود سپس وارد سبد خرید خود شوید و تسویه حساب نماید بعد از پرداخت وجه پیامک پرداخت “موفقیت آمیز” برای شما ارسال خواهد شد.`
  },
  {
    question: 'روش شرکت در دوره های آکادمی  چگونه است؟',
    answer: `ابتدا دوره مورد نظر خود را انخاب کنید وروی آن کلیک کنید تا به صفحع دورع منتقل شود بعد از این که از شرکت در دوره مطمعن شدید روی گزینه شرکت در دوره کلیک کنید که در ادامه دورع به سبد خرید شما اضافه می شود سپس وارد سبد خرید خود شوید و تسویه حساب نماید بعد از پرداخت وجه پیامک پرداخت “موفقیت آمیز” برای شما ارسال خواهد شد.`
  },
  {
    question: 'روش شرکت در دوره های آکادمی  چگونه است؟',
    answer: `ابتدا دوره مورد نظر خود را انخاب کنید وروی آن کلیک کنید تا به صفحع دورع منتقل شود بعد از این که از شرکت در دوره مطمعن شدید روی گزینه شرکت در دوره کلیک کنید که در ادامه دورع به سبد خرید شما اضافه می شود سپس وارد سبد خرید خود شوید و تسویه حساب نماید بعد از پرداخت وجه پیامک پرداخت “موفقیت آمیز” برای شما ارسال خواهد شد.`
  },
  {
    question: 'روش شرکت در دوره های آکادمی  چگونه است؟',
    answer: `ابتدا دوره مورد نظر خود را انخاب کنید وروی آن کلیک کنید تا به صفحع دورع منتقل شود بعد از این که از شرکت در دوره مطمعن شدید روی گزینه شرکت در دوره کلیک کنید که در ادامه دورع به سبد خرید شما اضافه می شود سپس وارد سبد خرید خود شوید و تسویه حساب نماید بعد از پرداخت وجه پیامک پرداخت “موفقیت آمیز” برای شما ارسال خواهد شد.`
  },
  {
    question: 'روش شرکت در دوره های آکادمی  چگونه است؟',
    answer: `ابتدا دوره مورد نظر خود را انخاب کنید وروی آن کلیک کنید تا به صفحع دورع منتقل شود بعد از این که از شرکت در دوره مطمعن شدید روی گزینه شرکت در دوره کلیک کنید که در ادامه دورع به سبد خرید شما اضافه می شود سپس وارد سبد خرید خود شوید و تسویه حساب نماید بعد از پرداخت وجه پیامک پرداخت “موفقیت آمیز” برای شما ارسال خواهد شد.`
  }
]


export default function FAQSection() {
  return (
    <div className='flex flex-col md:flex-row-reverse container mx-auto'>

      <div className="flex flex-col text-right text-white items-center justify-center w-full md:w-2/6">
        <h3 className=' font-bold text-3xl mb-12'>
          سوالات متداول کاربران
        </h3>

        <h5 className=' text-md mb-16'>
          مواردی که قبلا از ما پرسیده شده است
        </h5>

        <img decoding="async" width="800" height="566" src="https://aisun-ci.ir/wp-content/uploads/2024/07/سوالات-متداول.png" className="w-full hidden md:inline-block " style={{ verticalAlign: 'middle' }} alt="" srcSet="https://aisun-ci.ir/wp-content/uploads/2024/07/سوالات-متداول.png 800w, https://aisun-ci.ir/wp-content/uploads/2024/07/سوالات-متداول-300x212.png 300w, https://aisun-ci.ir/wp-content/uploads/2024/07/سوالات-متداول-768x543.png 768w, https://aisun-ci.ir/wp-content/uploads/2024/07/سوالات-متداول-600x425.png 600w, https://aisun-ci.ir/wp-content/uploads/2024/07/سوالات-متداول-64x45.png 64w" sizes="(max-width: 800px) 100vw, 800px" loading="eager" />
      </div>


      <div className=" text-white min-h-sceen flex-1">

        <div className="grid divide-y divide-neutral-200 px-6 mt-8">

          {data && data.map((item, index) => (
            <div key={index} className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">

                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                  <span className=' text-sm text-right font-semibold'>
                    {item.question}
                  </span>
                </summary>
                <p className="text-gray-200 mt-3  group-open:animate-fadeIn text-xs text-right leading-6">
                  {item.answer}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
