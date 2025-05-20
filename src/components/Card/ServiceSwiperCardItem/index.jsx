import React from 'react'

// @ts-ignore
export default function ServiceSwiperCardItem({imageSrc, title, link}) {
  return (
    <>
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
  <img className="w-full p-2 rounded-2xl" src={imageSrc} alt="Sunset in the mountains" />
  <div className="px-6 py-4">
    <div className="font-bold text-sm text-center text-gray-600 mb-6">
      {title}
    </div>
  </div>
  <div className="mx-auto flex justify-center pb-6">
  <button className="bg-transparent text-center hover:bg-purple-900 text-gray-500 hover:text-white text-sm py-2 px-4 border border-gray-500 hover:border-transparent rounded">
  درخواست سفارش
</button>
  </div>
</div></>
  )
}
