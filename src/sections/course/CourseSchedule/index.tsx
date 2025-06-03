"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Check, Users } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data that matches the API structure
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

interface Coach {
  _id: string
  __t: string
  first_name: string
  last_name: string
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
  members: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

// Component to display a single session
const SessionItem = ({ session }: { session: Session }) => {
  return (
    <div className="flex flex-col space-y-2 p-4 border-t">
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
  return (
    <Card
      className={`w-full mb-4 cursor-pointer transition-all ${
        isSelected ? "border-green-600 border-4" : "hover:bg-muted/90"
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
      <CardHeader className="relative">
        <div className="flex justify-between items-start pt-6">
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

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="sessions">
            <AccordionTrigger>جلسه ها ({program.sessions.length})</AccordionTrigger>
            <AccordionContent>
              {program.sessions.map((session) => (
                <SessionItem key={session._id} session={session} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          شروع دوره: {new Date(program.createdAt).toLocaleDateString()}
        </div>
        <div className="text-xs text-muted-foreground">وضعیت: {program.status}</div>
      </CardFooter>

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
  programs = mockPrograms,
  onProgramSelect,
}: {
  programs?: Program[]
  onProgramSelect?: (programId: string) => void
}) {
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null)

  const handleProgramSelect = (programId: string) => {
    setSelectedProgramId(programId)
    if (onProgramSelect) {
      onProgramSelect(programId)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4" dir="rtl">
      <h2 className="text-xs md:text-lg text-center font-semibold mb-6">اساتیدی که این درس را ارایه میکنند</h2>
      <div className="space-y-4" role="radiogroup" aria-label="انتخاب استاد">
        {programs.map((program) => (
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
          {/* <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
            onClick={() => console.log("Selected program:", selectedProgramId)}
          >
            تایید انتخاب
          </button> */}
        </div>
      )}
    </div>
  )
}
