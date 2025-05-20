'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Button from '../LoadingButton';
import { Search } from 'lucide-react';

export default function HeaderSearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div dir='rtl' className='relative'>
      <div className='relative mt-4 text-black text-lg rounded-lg'>
        <div className='flex w-full items-stretch md:items-center space-x-2'>
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
  );
}
