import { useState } from 'react'
import SearchComponent from './SearchComponent'
import TagSelector from './TagSelector'
import PriceRangeSlider from './PriceRangeSlider'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible"
import { ChevronDown } from 'lucide-react'

interface FilterAndSearchProps {
  onFilter: (searchTerm: string, selectedTags: string[], priceRange?: [number, number] | null) => void
}

export default function FilterAndSearch({ onFilter }: FilterAndSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const priceFilter = !!priceRange ? priceRange : null
    onFilter(term, selectedTags, priceFilter)
  }

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags)
    const priceFilter = !!priceRange ? priceRange : null
    onFilter(searchTerm, tags, priceFilter)
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range)
    onFilter(searchTerm, selectedTags, range)
  }

  return (
    <div className="w-full card">
      <div className="p-4 space-y-4 card_content">
        <SearchComponent onSearch={handleSearch} />
        
        <Collapsible className='pt-4'>
          <CollapsibleTrigger className="flex text-sm items-center justify-between text-right w-full p-2 font-medium border-b">
          <ChevronDown className="w-4 h-4" />
            دسته بندی محصولات 
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <TagSelector onSelectTags={handleTagSelect} />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2  mt-8 font-medium text-right text-sm border-b">
          <ChevronDown className="w-4 h-4" />
            قیمت   
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <PriceRangeSlider onRangeChange={handlePriceRangeChange} />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

