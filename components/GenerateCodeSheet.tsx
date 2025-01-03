import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import GenerateCodeForm from "./forms/GenerateCodeForm"

export default function CodeGenerateSheet({ id }: { id: string }) {
  return (
    <Sheet>
      <SheetTrigger className="text-sm ml-2">
        Generate Code
      </SheetTrigger>
      <SheetContent className="max-w-none  lg:w-[740px]" side="right" >
        <SheetHeader>
          <SheetTitle>Generate Code for Controller</SheetTitle>
        </SheetHeader>
        <GenerateCodeForm id={id} />
      </SheetContent>
    </Sheet>
  )
}
