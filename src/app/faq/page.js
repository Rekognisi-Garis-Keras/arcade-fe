import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/accordion";
import EachUtils from "@/utils/EachUtils";
import { MessageCircleQuestionMark } from "lucide-react";
import React from "react";
import { LIST_FAQ } from "./listFaq";

function FaqPage() {
  return (
    <div className="h-screen w-screen bg-[#F9F6EE] flex flex-col items-center">
      <header className="h-50 w-full bg-linear-to-r from-cyan-500 to-sky-500 flex flex-col gap-2 justify-center items-center">
        <h1 className="text-5xl font-extrabold tracking-wide relative text-white">
          FAQ
          <MessageCircleQuestionMark className="absolute rotate-25 w-20! h-20! stroke-white -right-25 -top-8" />
        </h1>
        <p className="text-md font-semibold text-white">
          (<span className="italic">Frequently Asked Question</span>)
        </p>
      </header>
      <main className="w-screen p-10 flex-1">
        <Accordion
          type="single"
          collapsible
          className="border-2 max-w-4xl mx-auto rounded-xl border-b-4"
        >
          <AccordionItem className={"py-6 bg-green-500 rounded-t-xl"}>
            <h1 className="font-bold text-xl text-white">Pertanyaan Umum</h1>
          </AccordionItem>
          <EachUtils
            of={LIST_FAQ}
            render={(item, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className={"px-5"}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            )}
          />
        </Accordion>
      </main>
    </div>
  );
}

export default FaqPage;
