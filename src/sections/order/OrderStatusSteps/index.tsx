import React from "react"
import { Clock, CheckCircle2, Truck, Flag } from "lucide-react"

type OrderStatus = "waiting" | "confirmed" | "delivered" | "finish"

interface OrderStatusStepsProps {
  orderStatus: OrderStatus
}

const steps: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: "waiting", label: "بررسی", icon: <Clock className="w-6 h-6" /> },
  { status: "confirmed", label: "تایید", icon: <CheckCircle2 className="w-6 h-6" /> },
  { status: "delivered", label: "ارسال", icon: <Truck className="w-6 h-6" /> },
  { status: "finish", label: "دریافت", icon: <Flag className="w-6 h-6" /> },
]

const OrderStatusSteps: React.FC<OrderStatusStepsProps> = ({ orderStatus }) => {
  const currentStepIndex = steps.findIndex((step) => step.status === orderStatus)

  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto relative">
      {steps.map((step, index) => {
        const isCompleted = index <= currentStepIndex
        const isActive = index === currentStepIndex

        return (
          <React.Fragment key={step.status}>
            <div className="flex flex-col items-center flex-1">
              <div className="relative">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    isCompleted ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-300 text-gray-500"
                  } ${isActive ? "ring-4 ring-green-200" : ""} z-10 relative`}
                >
                  {step.icon}
                </div>
              </div>
              <span className={`mt-2 text-xs font-medium ${isCompleted ? "text-green-500" : "text-gray-500"}`}>
                {step.label}
              </span>
            </div>
            {/* {index < steps.length - 1 && (
              <div className="absolute top-6 left-0 right-0 flex items-center justify-center z-0">
                <div className="w-full h-0.5">
                  <div className={`h-full ${index < currentStepIndex ? "bg-green-500" : "bg-gray-300"}`} />
                </div>
              </div>
            )} */}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default OrderStatusSteps

