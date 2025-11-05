import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleQuestionMark } from "lucide-react";
import React from "react";

function FaqPage() {
  return (
    <div className="h-full w-full bg-[#F9F6EE] flex flex-col items-center">
      <header className="h-50 w-full bg-linear-to-r from-cyan-500 to-sky-500 flex flex-col gap-2 justify-center items-center">
        <h1 className="text-5xl font-extrabold tracking-wide relative text-white">
          FAQ
          <MessageCircleQuestionMark className="absolute rotate-25 w-20! h-20! stroke-white -right-25 -top-8" />
        </h1>
        <p className="text-md font-semibold text-white">
          (<span className="italic">Frequently Asked Question</span>)
        </p>
      </header>
      <main className="w-4xl p-10 flex-1">
        <Accordion
          type="single"
          collapsible
          className="w-full border-2 rounded-xl border-b-4"
          defaultValue="item-1"
        >
          <AccordionItem className={"py-6 bg-green-500 rounded-t-xl"}>
            <h1 className="font-bold text-xl text-white">Pertanyaan Umum</h1>
          </AccordionItem>
          <AccordionItem value="item-1" className={"px-5"}>
            <AccordionTrigger>Product Information</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Shipping Details</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We offer worldwide shipping through trusted courier partners.
                Standard delivery takes 3-5 business days, while express
                shipping ensures delivery within 1-2 business days.
              </p>
              <p>
                All orders are carefully packaged and fully insured. Track your
                shipment in real-time through our dedicated tracking portal.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Return Policy</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We stand behind our products with a comprehensive 30-day return
                policy. If you&apos;re not completely satisfied, simply return
                the item in its original condition.
              </p>
              <p>
                Our hassle-free return process includes free return shipping and
                full refunds processed within 48 hours of receiving the returned
                item.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}

export default FaqPage;
