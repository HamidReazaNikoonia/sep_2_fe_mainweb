// @ts-nocheck
import React, {useState, useEffect} from 'react';
import { useQuery } from "@tanstack/react-query";
import {getCategoriesRequest} from '@/API/product';


interface TagSelectorProps {
  onSelectTags: (selectedTags: string[]) => void
}

const availableTags = ['هنری', 'البسه', 'اجسام', 'فیلم', 'آموزشی', 'ورزشی']

export default function TagSelector({ onSelectTags }: TagSelectorProps) {

  const [categoriesChecklist, setcategoriesChecklist] = useState()

  const { data, isError, isSuccess } = useQuery({
    queryFn: async () => await getCategoriesRequest(),
    queryKey: ["movies"], //Array according to Documentation
  });

  useEffect(() => {
    if(data && isSuccess) {

      const lol = data.map((t) => {
        return {
          checked: false,
          _id: t._id,
          name: t.name
        }
      })

      console.log({lol})
      setcategoriesChecklist(lol)
    }
  
    
  }, [isSuccess, data])
  


  // const handleTagChange = (tag: string, isChecked: boolean) => {
  //   onSelectTags(
  //     isChecked
  //       ? [...availableTags.filter(t => document.getElementById(t) instanceof HTMLInputElement && (document.getElementById(t) as HTMLInputElement).checked), tag]
  //       : availableTags.filter(t => t !== tag && document.getElementById(t) instanceof HTMLInputElement && (document.getElementById(t) as HTMLInputElement).checked)
  //   )
  // }

    const handleTagChange = (tag: string, isChecked: boolean) => {
      console.log({kir: isChecked});

      const prevstate = categoriesChecklist.filter(c => c._id !== tag._id )
      const newState = [...prevstate, {_id: tag._id, name: tag.name, checked: !tag.checked}]
      setcategoriesChecklist(newState)
      
      onSelectTags(newState.filter(tag => tag.checked))
    }

  return (
    <div className="space-y-2 flex flex-col items-end pt-4">
      {Array.isArray(categoriesChecklist) && categoriesChecklist.map(tag => (
        <div key={tag._id} className="flex items-center pt-2">
          <label htmlFor={tag._id} className="mr-3 text-xs">
            {tag.name}
          </label>
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 bg-gray-600"
            id={tag._id}
            checked={tag.checked}
            value={tag._id}
            onChange={(checked) => handleTagChange(tag, checked as unknown as boolean)}
          />
        </div>
      ))}
    </div>
  )
}

