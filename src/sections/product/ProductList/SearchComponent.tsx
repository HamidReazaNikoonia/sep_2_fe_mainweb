import { useState } from 'react'
import { Search } from 'lucide-react';


interface SearchComponentProps {
  onSearch: (searchTerm: string) => void
}

export default function SearchComponent({ onSearch }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const setSearchTermHandler = (val: string) => {
    if (val === '') {
      onSearch('')
    }
    setSearchTerm(val);
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <button className='bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded'>
      <Search size={18} />
      </button>
      <input
        type="text"
        placeholder="جستجو کنید "
        value={searchTerm}
        onChange={(e) => setSearchTermHandler(e.target.value)}
        className="flex-grow bg-gray-300 text-black px-4 py-2 rounded focus:outline-none text-xs text-right"
      />
    </form>
  )
}

