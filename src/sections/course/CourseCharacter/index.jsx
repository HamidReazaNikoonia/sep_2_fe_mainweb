import { Clock, Headset, WalletMinimal } from 'lucide-react';

export default function CourseCharacter() {
  return (
    <>
      <div className="test-gradient-bg my-1 flex w-full flex-col justify-around rounded-lg p-4 py-8 md:my-1.5 md:flex-row">
        <div className="mb-5 flex items-center justify-end md:mb-0">
          <div className="w-56 pr-4 text-right text-[13px] font-medium leading-7 md:w-44">
            بازگشت وجه درصورت عدم رضایـت از دوره آموزشی
          </div>

          <div>
            <div className="pink-gradient-bg rounded-2xl p-3 ">
              <WalletMinimal color="white" size={32} />
            </div>
          </div>

        </div>

        <div className="mb-5 flex items-center justify-end md:mb-0">
          <div className="w-36 pr-4 text-right text-[13px] font-medium leading-7">
            پشتیبانی ۲ ساله برای پاسخ به سوالات
          </div>

          <div>
            <div className="pink-gradient-bg rounded-2xl p-3 ">
              <Headset color="white" size={32} />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end">
          <div className="w-44 pr-4 text-right text-[13px] font-medium leading-7">
            دسترسی همیشگی به محتوای آفلاین آموزشی
          </div>

          <div>
            <div className="pink-gradient-bg rounded-2xl p-3 ">
              <Clock color="white" size={32} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
