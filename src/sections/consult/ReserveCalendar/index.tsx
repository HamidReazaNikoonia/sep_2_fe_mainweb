'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import momentJalaali from "moment-jalaali";
import { Calendar } from "react-datepicker2";

import LoadingSpinner from '@/components/LoadingSpiner';



// TEST
const timeSlotIsError = false;
const timeSlotIsLoading = false;

const timeSlotItemArray = [
  {
    startTime: '10:00',
    endTime: '11:00',
    isBooked: false
  },
  {
    startTime: '11:00',
    endTime: '12:00',
    isBooked: false
  },
  {
    startTime: '11:00',
    endTime: '13:00',
    isBooked: false
  },
  {
    startTime: '13:00',
    endTime: '14:00',
    isBooked: false
  },
  {
    startTime: '14:00',
    endTime: '15:00',
    isBooked: false
  },
  {
    startTime: '15:00',
    endTime: '16:00',
    isBooked: false
  },
  {
    startTime: '16:00',
    endTime: '17:00',
    isBooked: false
  },
  {
    startTime: '17:00',
    endTime: '18:00',
    isBooked: false
  },
  {
    startTime: '18:00',
    endTime: '19:00',
    isBooked: false
  },
  {
    startTime: '19:00',
    endTime: '20:00',
    isBooked: false
  },
  {
    startTime: '20:00',
    endTime: '21:00',
    isBooked: false
  },
  {
    startTime: '21:00',
    endTime: '22:00',
    isBooked: true
  }
]




export default function ReserveCalendar({dateChangeHandler, timeSlotChangeHandler}) {

  // States
  const [calendarValue, setcalendarValue] = useState(momentJalaali());
  const [selectedDateState, setSelectedDateState] = useState(
    momentJalaali().locale("fa").format("jYYYY/jM/jD")
  );
  const [timeSlotItem, settimeSlotItem] = useState(timeSlotItemArray);


  const calendarHandler = (selectedDate) => {
    setcalendarValue(selectedDate);

    setSelectedDateState(selectedDate.locale("fa").format("jYYYY/jM/jD"));
    dateChangeHandler(selectedDate.locale("fa").format("jYYYY/jM/jD"));
    console.log(selectedDateState);
  };


  const enabledRange = {
    min: momentJalaali().startOf("day"),
  };


  // Handle card click to toggle selection
  // @ts-ignore
  const handleSelectSlot = (index, slot) => {
    if (slot.isBooked) {
      toast.error("این تایم قبلا رزرو شده")
      return false;
    }
    const updatedSlots = timeSlotItem.map(
      (slot, i) => {
        return { ...slot, isSelected: i === index ? !slot.isSelected : false };
      }
      // i === index ? { ...slot, isSelected: !slot.isSelected } : slot
    );
    settimeSlotItem(updatedSlots);
    const selectedTimeSlotTime = updatedSlots.filter((slot) => slot.isSelected);
    timeSlotChangeHandler(selectedTimeSlotTime);
    console.log(selectedTimeSlotTime);
  };


  


  return (
    <div className='w-full flex flex-col md:flex-row pt-8 justify-around px-0 md:px-20 items-center'>
      {/* Calendar Wrapper */}
      <div>
        <Calendar
          value={calendarValue}
          isGregorian={false}
          min={enabledRange.min}
          onChange={(value) => calendarHandler(value)}
        />
      </div>


      {/* Time Slot Wrapper */}
      <div className='mt-10 md:mt-0'>
        <div
          id="timeslot_box"
          className='flex  flex-wrap gap-4 justify-center text-center items-center max-h-385 overflow-y-auto pb-50 pt-25 mr-30 rounded-15 border-1 border-gray-300'
        >
          {timeSlotIsError ? (
            <div>An error occurred: SERVER BROKEN</div>
          ) : null}
          <>
            {timeSlotIsLoading ? (
              <div
              className='flex p-7 justify-center items-center w-full'
                
              >
                <LoadingSpinner  />
              </div>
            ) : (
              <>
                {timeSlotItem &&
                  timeSlotItem.map((slot, index) => (
                    <div
                      key={index}
                      className='w-[300px] p-4 rounded-2xl'
                      onClick={() => handleSelectSlot(index, slot)}
                      style={{
                        opacity: slot.isBooked ? 0.4 : 1,
                        color: slot.isSelected ? "#fff" : "black",
                        cursor: slot.isBooked ? "not-allowed" : "pointer",
                        backgroundColor: slot.isSelected
                          ? "rgb(33 48 127)"
                          : "rgb(245 245 245)",
                      }}
                    >
                      {/* {slot.isBooked && (
                              <Typography>This Slot Booked By User</Typography>
                            )} */}
                      <h5 >{`شروع: ${slot.startTime} - پایان: ${slot.endTime}`}</h5>
                    </div>
                  ))}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  )
}
