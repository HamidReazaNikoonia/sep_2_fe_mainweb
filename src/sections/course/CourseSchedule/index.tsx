"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getCourseSessionPrograms } from "@/API/course"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Check, Users, Play, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data that matches the API structure
const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

const mockPrograms = [
  {
    _id: "683df3bbec28c1ed6d9fa1ce",
    max_member_accept: 14,
    status: "active",
    course: null,
    coach: {
      _id: "680bd330e9487d95620ae6c1",
      __t: "Coach",
      first_name: "حمید",
      last_name: "نیکونیا",
      portfolio: [
        {
          _id: "port1",
          type: "image",
          url: "/placeholder.svg?height=200&width=200",
          title: "نمونه کار ۱",
        },
        {
          _id: "port2",
          type: "video",
          url: "/placeholder.svg?height=200&width=200",
          thumbnail: "/placeholder.svg?height=200&width=200",
          title: "ویدیو آموزشی",
        },
        {
          _id: "port3",
          type: "image",
          url: "/placeholder.svg?height=200&width=200",
          title: "نمونه کار ۲",
        },
      ],
    },
    class_id: "683b425f3dbcefc2a0f0bbbb",
    program_type: "ON-SITE",
    sessions: [
      {
        status: "scheduled",
        _id: "683df3bbec28c1ed6d9fa1cf",
        date: "1405/5/20",
        startTime: "08:00",
        endTime: "09:00",
        location: "Music Room A",
      },
      {
        status: "scheduled",
        _id: "683df3bbec28c1ed6d9fa1d0",
        date: "1405/5/27",
        startTime: "10:00",
        endTime: "12:00",
        location: "Music Room A",
      },
    ],
    course_subjects: [
      {
        _id: "sub1",
        title: "مبانی موسیقی",
        sub_title: "آشنایی با نت‌ها و ریتم",
      },
      {
        _id: "sub2",
        title: "تکنیک‌های پیشرفته",
        sub_title: "تمرین‌های تخصصی و حرفه‌ای",
      },
      {
        _id: "sub3",
        title: "اجرای قطعات کلاسیک",
        sub_title: "تفسیر و اجرای آثار بزرگان",
      },
    ],
    members: [],
    createdAt: "2025-06-02T18:55:55.691Z",
    updatedAt: "2025-06-02T18:55:55.691Z",
    __v: 0,
  },
  {
    _id: "683df3bbec28c1ed6d9fa1cf",
    max_member_accept: 10,
    status: "active",
    course: null,
    coach: {
      _id: "680bd330e9487d95620ae6c2",
      __t: "Coach",
      first_name: "سارا",
      last_name: "محمدی",
      portfolio: [
        {
          _id: "port4",
          type: "video",
          url: "/placeholder.svg?height=200&width=200",
          thumbnail: "/placeholder.svg?height=200&width=200",
          title: "کلاس آنلاین نمونه",
        },
        {
          _id: "port5",
          type: "image",
          url: "/placeholder.svg?height=200&width=200",
          title: "گواهینامه تدریس",
        },
      ],
    },
    class_id: "683b425f3dbcefc2a0f0bbbc",
    program_type: "ONLINE",
    sessions: [
      {
        status: "scheduled",
        _id: "683df3bbec28c1ed6d9fa1d1",
        date: "1405/5/21",
        startTime: "14:00",
        endTime: "16:00",
        location: "Zoom Meeting",
      },
      {
        status: "scheduled",
        _id: "683df3bbec28c1ed6d9fa1d2",
        date: "1405/5/28",
        startTime: "14:00",
        endTime: "16:00",
        location: "Zoom Meeting",
      },
    ],
    course_subjects: [
      {
        _id: "sub4",
        title: "آموزش آنلاین موثر",
        sub_title: "روش‌های نوین تدریس مجازی",
      },
      {
        _id: "sub5",
        title: "تعامل با دانشجو",
        sub_title: "ایجاد ارتباط موثر در فضای مجازی",
      },
    ],
    members: [],
    createdAt: "2025-06-02T19:00:00.000Z",
    updatedAt: "2025-06-02T19:00:00.000Z",
    __v: 0,
  },
]

// Types based on the API response
interface Session {
  _id: string
  date: string
  startTime: string
  endTime: string
  location: string
  status: string
}

interface PortfolioItem {
  _id: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  title: string
}

interface CourseSubject {
  _id: string
  title: string
  sub_title: string
}

interface Coach {
  _id: string
  __t: string
  first_name: string
  last_name: string
  portfolio?: PortfolioItem[]
}

interface Program {
  _id: string
  max_member_accept: number
  status: string
  course: any
  coach: Coach
  class_id: string
  program_type: string
  sessions: Session[]
  course_subjects?: CourseSubject[]
  members: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

// Component to display a single session
const SessionItem = ({ session }: { session: Session }) => {
  return (
    <div dir="rtl" className="flex flex-col space-y-2 p-4 border-t">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
          <span className="text-sm">{session.date}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
        <span className="text-sm">{`${session.startTime} - ${session.endTime}`}</span>
      </div>
    </div>
  )
}

// Component to display portfolio items
const PortfolioGrid = ({ portfolio }: { portfolio: any[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {portfolio.map((item) => (
        <div key={item._id} className="relative group">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {item.media_type === "IMAGE" ? (
              <img
                src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`}
                alt={item.media_title}
                className="w-full h-full object-cover"
              />
            ) : item.media_type === "VIDEO" && (
              <>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <video 
                  className="w-full h-full object-cover"
                  controls
                  preload="none"
                  poster="/placeholder.svg?height=200&width=200"
                >
                  <source data-src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </>
            )}
          </div>
          <p className="text-xs mt-2 text-center">{item.media_title}</p>
        </div>
      ))}
    </div>
  )
}

// Component to display course subjects
const SubjectsList = ({ subjects }: { subjects: CourseSubject[] }) => {
  return (
    <div dir="rtl" className="p-4 space-y-3">
      {subjects.map((subject) => (
        <div key={subject._id} className="flex items-start space-x-3 p-3 border rounded-lg">
          <FileText className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0 ml-2" />
          <div className="flex-1">
            <h4 className="font-medium text-sm">{subject.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{subject.sub_title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Component to display a single program card
const ProgramCard = ({
  program,
  isSelected,
  onSelect,
}: {
  program: Program
  isSelected: boolean
  onSelect: () => void
}) => {
  const firstSessionDate = program?.sessions[0]?.date || "تاریخ نامشخص";
  const hasDiscount = program?.price_discounted && program.price_discounted !== program.price_real;
  return (
    <Card
      className={`w-full mb-4 cursor-pointer transition-all ${
        isSelected ? "border-green-500 border-2" : "hover:bg-muted/95"
      }`}
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      role="radio"
      aria-checked={isSelected}
    >
      <CardHeader className="relative pt-16">
        <div className="flex justify-between items-start">
          <div>
            <CardDescription>استاد</CardDescription>
            <CardTitle>{`${program.coach.first_name} ${program.coach.last_name}`}</CardTitle>
          </div>
          <Badge variant="default">{program.program_type === "ON-SITE" ? "حضوری" : "آنلاین"}</Badge>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <Users className="h-4 w-4 ml-2 text-muted-foreground" />
          <span className="text-xs">{`جای خالی ${program.max_member_accept} `}</span>
        </div>

        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sessions" className="text-xs">
               کلاس های دوره
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">
              نمونه کار های استاد
            </TabsTrigger>
            <TabsTrigger value="subjects" className="text-xs">
              سرفصل ها
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="mt-4">
            <div className="space-y-2">
              {program.sessions.map((session) => (
                <SessionItem key={session._id} session={session} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-4">
            {program?.sample_media && program?.sample_media.length > 0 ? (
              <PortfolioGrid portfolio={program?.sample_media} />
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">نمونه کاری موجود نیست</div>
            )}
          </TabsContent>

          <TabsContent value="subjects" className="mt-4">
            {program.subjects && program.subjects.length > 0 ? (
              <SubjectsList subjects={program.subjects} />
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">سرفصل موجود نیست</div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          شروع دوره: {firstSessionDate}
        </div>
        <div className="text-xs text-muted-foreground">وضعیت: {program.status === "active" ? "فعال" : "غیرفعال"}</div>
      </CardFooter>

      {/* Price display section */}
      {program.price_real && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm font-medium">قیمت:</span>
            {hasDiscount ? (
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-muted-foreground">
                  {program.price_real.toLocaleString()} تومان
                </span>
                <Badge variant="destructive" className="px-2 py-0">
                  {program.price_discounted.toLocaleString()} تومان
                </Badge>
              </div>
            ) : (
              <span className="text-sm font-semibold">
                {program.price_real.toLocaleString()} تومان
              </span>
            )}
          </div>
        )}

      {/* Hidden radio input for form submission */}
      <input
        type="radio"
        name="selectedProgram"
        value={program._id}
        checked={isSelected}
        onChange={() => {}} // Controlled by parent component
        className="sr-only" // Visually hidden
      />
    </Card>
  )
}

// Main component to display all programs
export default function CourseSchedule({
  courseId,
  onProgramSelect,
}: {
  courseId: string
  onProgramSelect?: (programId: string) => void
}) {
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null)
  
  const { data: programs, isLoading, error } = useQuery({
    queryKey: ['coursePrograms', courseId],
    queryFn: () => getCourseSessionPrograms(courseId),
    enabled: !!courseId,
  })

  const handleProgramSelect = (programId: string) => {
    setSelectedProgramId(programId)
    if (onProgramSelect) {
      onProgramSelect(programId)
    }
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 text-center" dir="rtl">
        <p>در حال بارگذاری...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 text-center text-red-500" dir="rtl">
        <p>خطا در دریافت اطلاعات: {(error as Error).message}</p>
      </div>
    )
  }

  const programsData = programs?.data?.programs || []

  return (
    <div className="mx-auto w-full max-w-3xl p-4" dir="rtl">
      <h2 className="text-xs md:text-lg text-center font-semibold mb-6">اساتیدی که این درس را ارایه میکنند</h2>
      <div className="space-y-4" role="radiogroup" aria-label="انتخاب استاد">
        {programsData.map((program) => (
          <ProgramCard
            key={program._id}
            program={program}
            isSelected={selectedProgramId === program._id}
            onSelect={() => handleProgramSelect(program._id)}
          />
        ))}
      </div>

      {selectedProgramId && (
        <div className="mt-6 flex justify-end">
          <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
            onClick={() => console.log("Selected program:", selectedProgramId)}
          >
            تایید انتخاب
          </button>
        </div>
      )}
    </div>
  )
}
