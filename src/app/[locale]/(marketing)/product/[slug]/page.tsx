// import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image'

// import ProductListHeader from '@/sections/product/ProductListHeader';
// import ProductList from '@/sections/product/ProductList';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Star } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import CommentLayout from '@/components/Comment';

import {SERVER_API_URL} from '@/API/config';

import product_placeholder from "@/public/assets/images/product_placeholder.png";

type IAboutProps = {
  params: Promise<{ slug: string; locale: string }>;
};

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

// export async function generateMetadata() {
//   // const { locale } = await props.params;
//   // const t = await getTranslations({
//   //   locale,
//   //   namespace: 'courses',
//   // });

//   // return {
//   //   title: t('meta_title'),
//   //   description: t('meta_description'),
//   // };
// }


const fetchRepo = async ({ productId }: { productId: string }) => {
  const res = await fetch(`${SERVER_API_URL}/product/${productId}/11`, {
    next: { revalidate: 60 }, // Enables ISR (Incremental Static Regeneration)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};


export default async function SpecificCourse(props: IAboutProps) {
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  const params = await props.params;
  const productsData = await fetchRepo({ productId: params.slug });
  console.log({ nn: productsData.data })


  console.log({ pp: params.slug })


  const product = productsData.data



  return (
    <div className='overflow-hidden bg-[#E1EBEE] text-black min-h-screen'>
      <div className="container mx-auto pt-12">
        {/* Header */}
        <div className='mb-8 flex mr-8 md:mr-0 flex-col-reverse md:flex-row justify-end items-end'>
          <Breadcrumbs levels={[{ title: 'محصولات', link: '/product' }, { title: product.title, link: '' }]} />
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row -mx-4">

          {/* Left Side */}

          <div className="md:flex-1 px-4">
            <div >
              <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                <div className="h-64 relative md:h-80 rounded-lg shadow-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <Image
                    alt="Mountains"
                    // Importing an image will
                    // automatically set the width and height
                    src={product?.thumbnail?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${product?.thumbnail?.file_name}` :  product_placeholder}

                    fill
                    // Make the image display full width
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                    }}
                  />
                </div>
              </div>

              <div className="flex -mx-2 mb-4">

                <div className="flex-1 px-2">
                  <button className="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ring-2 ring-indigo-300 ring-inset">
                    <span className="text-2xl"></span>
                  </button>
                </div>

                <div className="flex-1 px-2">
                  <button className="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ring-2 ring-indigo-300 ring-inset">
                    <span className="text-2xl"></span>
                  </button>
                </div>

                <div className="flex-1 px-2">
                  <button className="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ring-2 ring-indigo-300 ring-inset">
                    <span className="text-2xl"></span>
                  </button>
                </div>


                <div className="flex-1 px-2">
                  <button className="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ring-2 ring-indigo-300 ring-inset">
                    <span className="text-2xl"></span>
                  </button>
                </div>


              </div>
            </div>




          </div>


          {/* Rigth SIde */}

          <div className="md:flex-1 px-4 mb-16">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-black text-right text-2xl md:text-3xl">
              {product?.title}
            </h2>
            <p className="text-gray-800 text-right text-sm mt-6">
              {product?.subtitle}
            </p>

            <div className="flex flex-col md:flex-row items-center space-x-4 my-4 justify-between">
              <div>
                <div className="rounded-lg bg-gray-100 border-2 flex mt-8 md:mt-0 py-2 px-3">
                  {product?.is_available ? (
                    <>
                      <span className="text-gray-700 mr-1 mt-1">تومان</span>

                      <span className="font-bold text-gray-800 text-3xl">{(product.price).toLocaleString('ar-EG')}</span>

                    </>


                  ) : (<span className='text-gray-700 font-bold px-12' > ناموجود </span>)}
                </div>
              </div>
              {(product?.discountable?.status && product?.is_available) && (
                <div className="flex-1 mt-8 md:mt-0">
                <p className="text-green-500 text-xl font-semibold">
                  {(10).toLocaleString('ar-EG')}٪ تخفیف
                </p>
                <p className="text-gray-800 text-sm">شامل هزینه مالیات</p>
              </div>
              )}
              

              <div className="mt-2.5 mb-5 flex items-center">
                <span className="mr-2 pt-1 rounded bg-yellow-300 text-black px-2.5 py-0.5 text-xs font-semibold">5</span>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    strokeWidth={1}
                    size={18}
                    fill={index < 5 ? "#facc15" : "gray"}
                    stroke="none"
                  />
                ))}
                {/* <Star  stroke='gray' fill='none' size={18} />       */}
              </div>
            </div>

            <p className="text-gray-800 text-sm pl-2 text-right leading-8 mt-8 border-t-2 pt-8 border-gray-700">

              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد

            </p>

            <div className="flex justify-center md:justify-end mt-8 py-4 space-x-4">
              {/* <div className="relative">
            <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
            <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>

            
          </div> */}

              {/* <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
            Add to Cart
          </button> */}
              <AddToCartButton productIsAvailable={true} product={productsData.data} />
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <CommentLayout type="product" productId={productsData.data?._id} />


    </div>
  );
};
