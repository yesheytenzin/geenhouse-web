
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AccordionData } from "@/lib/accordion-list";

const HelpPage = () => {
  return (
    <Accordion type="single" collapsible>
      {
        AccordionData.map((item, index) => (
          <AccordionItem key={index} value={"accordion-" + index}>
            <AccordionTrigger>
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}
export default HelpPage;
