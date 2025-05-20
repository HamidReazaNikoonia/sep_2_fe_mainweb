import { useEffect, useState } from "react"
import { Plus, Minus, Trash2, ChevronDown, X } from 'lucide-react'
import toast from "react-hot-toast";



import DotLoading from "@/components/DotLoading";
import { isEmpty } from "@/utils/Helpers";

import { Address, AddressResponse } from "@/types/Product";

// eslint-disable-next-line prefer-const
let iranCity = require('iran-city');


const AddressSelector: React.FC<{
  isAddressDataExist: boolean;
  addresses: AddressResponse[]
  selectedAddress: AddressResponse | null
  onSelectAddress: (address: Address) => void
  onSubmitAddressForm: (address: Address) => void
}> = ({ addresses, selectedAddress, onSelectAddress, isAddressDataExist, onSubmitAddressForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [addressState, setaddressState] = useState({
    city: 8,
    state: '301',
    address: '',
    postalCode: '',
    title: ''
  })


  useEffect(() => {
    let CitiesOfProvince = iranCity.citiesOfProvince(8);
    setStates(CitiesOfProvince)

  }, [])


  const AllProvince = iranCity.allProvinces();


  if (!isAddressDataExist) {
    return (
      <div className="flex justify-center space-x-4">
        <DotLoading />

        <div dir="rtl" className=" text-sm text-purple-900 text-right">
          بارگذاری آدرس های شما
        </div>
      </div>

    )
  }





  // submit
  const submitAddressHandler = () => {
    console.log(addressState);
    console.log({ koss: addressState })

    // validate form
    if (!addressState.state) {
      toast.error("لطفا شهر را انتخاب کنید");
      return false;
    }

    if (isEmpty(addressState.address)) {
      toast.error('لطفا آدرس را کامل وارد کنید');
      return false;
    }

    if (isEmpty(addressState.postalCode)) {
      toast.error('لطفا کد پستی را وارد کنید');
      return false;
    }

    onSubmitAddressForm(addressState);
    
    // reset form
    setaddressState({
      city: 8,
      state: '301',
      address: '',
      postalCode: '',
      title: ''
    })
    setShowModal(false);
    return false;
  }


  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = parseInt(event.target.value);
    let CitiesOfProvince = iranCity.citiesOfProvince(cityId);
    setaddressState({ ...addressState, city: cityId, state: CitiesOfProvince[0].id })
    setStates(CitiesOfProvince || []);
    // console.log(CitiesOfProvince)
  };


  // utils helper
  const findCityName = (cityId) => {
    if (cityId) {
      console.log({azadeh: iranCity.cityById(parseInt(cityId))})
      return iranCity.cityById(parseInt(cityId));
    }

    return '';
    
  }

  return (
    <div className="flex flex-col justify-center">
      <div onClick={() => setShowModal(true)} className="flex items-center align-middle self-end space-x-2 text-purple-800 cursor-pointer hover:text-blue-600 transition-colors duration-200">
        <span className="font-semibold text-xs"> آدرس جدید</span>
        <div className="w-5 h-5 bg-purple-800 rounded-full">
          <Plus color="white" className="w-5 h-5 p-[2px]" />
        </div>
      </div>


      <div dir="rtl" className="relative mt-3">

        <button
          dir="rtl"
          disabled={addresses?.length === 0}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 text-right bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

          {selectedAddress ? (
            <div className="text-xs text-gray-600 leading-5">
              <p className=" text-sm text-gray-900 mb-1">{selectedAddress?.billingAddress?.title}</p>
              <p>{selectedAddress?.billingAddress?.state && findCityName(selectedAddress?.billingAddress?.state).name} - {selectedAddress?.billingAddress?.city && findCityName(selectedAddress?.billingAddress?.state).province_name}</p>
              <p style={{maxWidth: '90%'}} className="pl-4 text-gray-500">{selectedAddress?.billingAddress?.addressLine1}</p>

              <p className="text-[11px] text-gray-600">{`کد پستی: ${selectedAddress?.billingAddress?.postalCode}`}</p>
            </div>
          ) : (
            <p className="text-gray-500">
              {addresses?.length === 0 ? 'آدرس جدید وارد کنید' : 'آدرس انتخاب کنید'}
            </p>
          )}
          <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2" />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            {addresses.map((address) => (
              <button
                key={address._id}
                onClick={() => {
                  onSelectAddress(address)
                  setIsOpen(false)
                }}
                className="w-full p-3 text-right  hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                <p className="text-sm text-gray-900">{address?.billingAddress?.title}</p>
                <p className="text-xs text-gray-600 leading-5">{address?.billingAddress?.addressLine1}</p>
                <p className="text-[10px] mt-1 text-gray-600">{`${findCityName(address?.billingAddress?.state).name}, ${findCityName(address?.billingAddress?.state).province_name} ${address?.billingAddress?.postalCode}`}</p>
              </button>
            ))}
          </div>
        )}
      </div>


      {/* Address Modal */}
      {showModal && (
        <>
          <div
            style={{ zIndex: 999999999 }}
            className="justify-center items-start md:items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full md:w-2/3 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex  w-full bg-[#1f2937e0] outline-none focus:outline-none px-0 md:px-10 py-6 md:py-8">
                <div className="flex flex-col px-6 md:px-8 w-full">
                  <div dir="rtl" className="flex flex-col mb-4">
                    <label htmlFor="course_type"
                      className="text-xs mb-1 font-medium text-stone-100">
                      استان
                      <span className="text-red-500 mr-1">*</span>
                    </label>

                    <select id="course_type"
                      value={addressState.city}
                      onChange={(e) => handleCityChange(e)}
                      className="text-right text-white text-xs mt-2 block w-full cursor-pointer rounded-md border border-gray-500 bg-gray-700 px-4 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                      {AllProvince.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div dir="rtl" className="flex flex-col mb-4">
                    <label htmlFor="state_selectbox"
                      className="text-xs mb-1 font-medium text-stone-100">
                      شهر
                      <span className="text-red-500 mr-1">*</span>
                    </label>

                    <select id="state_selectbox"
                      value={addressState.state}
                      onChange={(e) => setaddressState({ ...addressState, state: e.target.value })}
                      className="text-right text-white text-xs mt-2 block w-full cursor-pointer rounded-md border border-gray-500 bg-gray-700 px-4 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                      {states && states.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div
                    dir="rtl"
                    className="relative mb-5 w-full flex flex-col rounded-md">
                    <label htmlFor="address_textarea"
                      className="text-xs mb-2 font-medium text-stone-100">
                      آدرس
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <textarea style={{ minHeight: "80px" }} cols={20} rows={25} id="address_textarea" name="address"
                      value={addressState.address}
                      onChange={(e) => setaddressState({ ...addressState, address: e.target.value })}
                      className="h-12 w-full text-xs cursor-text rounded-md border border-gray-500 bg-gray-700 py-4 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-right"
                      placeholder="آدرس خود را کامل وارد کنید" />
                    <div className=' hidden md:block'>
                    </div>
                  </div>



                  {/* Postal-Code and tel */}
                  <div className="flex flex-col md:flex-row justify-center items-center md:justify-between space-x-0 md:space-x-4" >
                    <div
                      dir="rtl"
                      className="relative w-full md:w-2/4 mb-5 flex flex-col rounded-md">
                      <label htmlFor="postal_code"
                        className="text-xs mb-2 font-medium text-stone-100">

                        کد پسنی
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <input type="text" id="postal_code" name="postal_code"
                        required
                        value={addressState.postalCode}
                        onChange={(e) => setaddressState({ ...addressState, postalCode: e.target.value })}
                        className="h-12 w-full text-white text-xs cursor-text rounded-md border border-gray-500 bg-gray-700 py-4 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-right"
                        placeholder="" />
                      <div className=' hidden md:block'>
                      </div>
                    </div>


                    <div
                      dir="rtl"
                      className="relative w-full md:w-2/4 mb-5 flex flex-col rounded-md">
                      <label htmlFor="telephone"
                        className="text-xs mb-2 font-medium text-stone-100">عنوان</label>
                      <input type="text" id="telephone" name="telephone"
                        value={addressState.title}
                        onChange={(e) => setaddressState({ ...addressState, title: e.target.value })}
                        className="h-12 text-white w-full text-xs cursor-text rounded-md border border-gray-500 bg-gray-700 py-4 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-right"
                        placeholder="مثلا خانه" />
                      <div className=' hidden md:block'>
                      </div>
                    </div>
                  </div>


                  {/* Buttons */}
                  <div className="flex w-full mt-3 flex-row  space-x-2 justify-center md:justify-end items-center">
                    <button onClick={submitAddressHandler} className="px-8  w-2/3 md:w-1/3 py-4 bg-purple-800 text-white text-xs rounded-md">
                      ثبت آدرس
                    </button>

                    <button onClick={() => setShowModal(false)} className="px-8  w-auto py-4 bg-red-800 text-white text-xs rounded-md">
                      انصراف
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>

  )
}

export default AddressSelector;