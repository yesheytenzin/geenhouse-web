import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Icons from "./Icons"

export function AlertHelper() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-sm space-x-2 hover:scale-105 w-full">
          <p>
            Help
          </p>
          <Icons.help />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Help Manual for NewsFeed</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="prose">1. Right Click on the post for actions</p>
            <p className="prose">2. Scroll at the bottom for pagination</p>
            <p className="prose">3. Click on the plus icon to add a new post</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
