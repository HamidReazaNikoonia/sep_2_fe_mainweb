import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";



import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { List, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import React from "react";


export const Item = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <div style={{ background: "linear-gradient(90deg,#4dba64,#25a06f)" }}   className="flex items-center rounded-2xl bg-slate-200 mb-2" dir="rtl">
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md py-2 px-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-xs font-medium leading-none">
            <div className="flex items-center">
              <ShoppingCart color="white" size={18} />
              <span className="mr-1 text-xs text-white" > {title} </span>
            </div>
          </div>
        </a>
    </div>
  )
})

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-3xl" variant="outline" >
          موضوعات
          <List size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-6">
          {/* <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
          موضوعات
        </SheetHeader>
        
        <Accordion dir="rtl" type="single" collapsible className="w-full text-right">
      <AccordionItem value="item-1">
        <AccordionTrigger>محصولات فرهنگی</AccordionTrigger>
        <AccordionContent>
         <div className="flex flex-wrap justify-end space-x-2">
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />

         </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>دوره های آموزشی</AccordionTrigger>
        <AccordionContent>
        <div className="flex flex-wrap justify-end space-x-2">
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />

         </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>مشاوره</AccordionTrigger>
        <AccordionContent>
        <div className="flex flex-wrap justify-end space-x-2">
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />
          <Item href="/" title=" فرهنگی" />

         </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>


        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
