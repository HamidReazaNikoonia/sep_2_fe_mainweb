'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// API
import { getGeneralSearchRequest } from '@/API/generalSearch';
import { useQuery } from '@tanstack/react-query';
import List from '@/sections/product/ProductList/List';
import CourseCardItem from '@/components/Card/CourseCard';

import { Input } from '@/components/ui/input';
import Button from '@/components/LoadingButton';
import { Search } from 'lucide-react';

const GeneralSearchPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <GeneralSearch />
    </Suspense>
  );
}


function GeneralSearch() {

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterParams, setFilterParams] = useState({ q: query });
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: async () => await getGeneralSearchRequest(filterParams || {}),
    enabled: filterParams !== null,
    queryKey: ["general_search", filterParams], //Array according to Documentation
  });



  useEffect(() => {
    console.log({ dataInUseEffect: data });
    if (data?.data && isSuccess) {
      setFilteredProducts(data?.data)
    }
  }, [data, isSuccess])


  const retriveProductFromList = (items: any) => {
    return items.filter((item: any) => item.type === 'Product')
  }

  const retriveCourseFromList = (items: any) => {
    return items.filter((item: any) => item.type === 'Course')
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setFilterParams({ q: searchTerm });
      setFilteredProducts([]);
    }
  };


  return (
    <div className='overflow-hidden bg-[#E1EBEE] text-black min-h-screen'>
      <div className="container mx-auto pt-8 pb-12 px-8 md:px-24">
        {/* Header */}
        <div dir='rtl' className='relative'>
      <div className='relative mt-4 text-black text-lg'>
        <div className='flex w-full items-stretch md:items-center space-x-2 mr-0 md:mr-8'>
          <Input
            placeholder='جستجو کنید'
            className='w-full px-7 py-8 shadow-none md:shadow-lg rounded-l-none focus:outline-none rounded-r-lg md:rounded-lg bg-white focus:ring-0 focus:ring-offset-0 outline-none focus:ring-transparent'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className='flex rounded-none md:rounded-lg border flex-row relative right-0 md:right-[-75px] text-sm bg-green-600 -mr-3 md:mr-0 rounded-l-lg'
            type='button'
            onClick={handleSearch}
          >
            <Search />
          </Button>
        </div>
      </div>
    </div>
      </div>

      <div className="px-4 pt-4">

        {/* Product List */}
        <div className='w-full flex flex-col'>
          <div className=' container mx-auto pb-6 px-2  md:px-8 text-2xl font-semibold text-right'>
            محصولات
          </div>


          <div dir='rtl' className='w-full mx-auto container px-2 md:px-8 pb-12'>
            <List products={retriveProductFromList(filteredProducts)} />
          </div>
        </div>



        {/* Course List */}
        <div className=' w-full flex flex-col pb-12'>
          <div className=' container mx-auto pb-6 px-2  md:px-8 text-2xl font-semibold text-right'>
            دوره ها
          </div>

          <div className="flex w-full flex-wrap gap-3 px-8 md:px-0">
            {retriveCourseFromList(filteredProducts) && retriveCourseFromList(filteredProducts).map((course) => (
              <CourseCardItem data={course} key={course._id} isLikedByUser />
            ))}
          </div>



        </div>
      </div>
    </div>
  );
};


export default GeneralSearchPage;