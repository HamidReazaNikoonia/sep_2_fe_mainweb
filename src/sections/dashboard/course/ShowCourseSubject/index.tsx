import { Clock, FileText, Lock, Unlock } from "lucide-react"

import { formatDuration } from '@/utils/Helpers';

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";


interface File {
  _id: string
  filename: string
}

interface CourseObject {
  subject_title: string
  status: "PUBLIC" | "PRIVATE"
  duration: number
  files: File
}

interface ShowSubjectCourseProps {
  course_objects: CourseObject[]
}

export function ShowSubjectCourse({ course_objects }: ShowSubjectCourseProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {course_objects.map((subject, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
          <AccordionTrigger className="px-4 py-4 hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <span className="font-semibold text-left">{subject.subject_title}</span>
              <div className="flex items-center space-x-2">
                {/* <Badge className="ml-4" variant={subject.status === "PUBLIC" ? "default" : "secondary"}>
                  {subject.status === "PUBLIC" ? (
                    <Unlock className="w-3 h-3 mr-1" />
                  ) : (
                    <Lock className="w-3 h-3 mr-1" />
                  )}
                  {subject.status}
                </Badge> */}
                <div className="flex items-center text-sm text-muted-foreground ml-4">
                  {formatDuration(subject.duration)}
                  <Clock className="w-4 h-4 mr-1" />
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2">
            <Table>
              {/* <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader> */}
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 ml-2 text-muted-foreground" />
                      <div className="flex flex-row">
                        <Button className="text-xs md:text-base" variant="ghost">
                          دانلود فایل

                        </Button>

                        <Button className="text-xs md:text-base" variant="ghost">
                          تماشای آنلاین

                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatDuration(subject.duration)}
                    </div>
                  </TableCell> */}
                </TableRow>
              </TableBody>
            </Table>


            {/* ٰVideo Container */}
            <video className="h-full w-full rounded-lg" controls muted>
              <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

