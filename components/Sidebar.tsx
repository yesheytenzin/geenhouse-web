import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserLabel from "./UserLabel";
import Icons from "./Icons";
import Link from "next/link";

export default function Sidebar() {
  const [SheetCloseWrapper, shetCloseWrapperProps] = [SheetClose, { asChild: true }]
  return (
    <Sheet >
      <SheetTrigger asChild className="ml-[-12px] fixed top-1/2 z-10 transform -translate-y-1/2">
        <Button>
          <Icons.drawer />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:w-[350px] max-w-sm dark:bg-gray-300">
        <div className="flex py-5">
          <Avatar>
            <AvatarImage src="https://source.boringavatars.com/beam/50/" alt="@logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <UserLabel />
        </div>
        <div className="w-full bg-black h-1"></div>
        {/* Sidebar content here */}
        <section className="space-y-3 py-5">
          <SheetCloseWrapper {...shetCloseWrapperProps}>
            <Link href="/dashboard" className="flex justify-between prose no-underline hover:underline">
              Dashboard Analytics
              <Icons.dashboard />
            </Link>
          </SheetCloseWrapper>
          <SheetCloseWrapper {...shetCloseWrapperProps}>
            <Link
              href="/NewsFeed"
              className="flex justify-between prose no-underline hover:underline "
            >
              News Feeds
              <Icons.newspaper />
            </Link>
          </SheetCloseWrapper>
          <SheetCloseWrapper {...shetCloseWrapperProps}>
            <Link href="/crops/parameters" className="flex justify-between prose no-underline hover:underline">
              Manage Threshold Parameters
              <Icons.thermometer />
            </Link>
          </SheetCloseWrapper>
          <SheetCloseWrapper {...shetCloseWrapperProps}>
            <Link href="/users" className="flex justify-between prose no-underline hover:underline">
              Manage Users
              <Icons.usersGroup />
            </Link>
          </SheetCloseWrapper>
          <SheetCloseWrapper {...shetCloseWrapperProps}>
            <Link href="/settings" className="flex justify-between prose no-underline hover:underline">
              Settings
              <Icons.settings />
            </Link>
          </SheetCloseWrapper>
          <div className="divider"></div>
          <SheetCloseWrapper {...shetCloseWrapperProps}>
            <Link href="/api/auth/signout" className="flex justify-between prose no-underline hover:underline">
              Logout session
              <Icons.logout />
            </Link>
          </SheetCloseWrapper>
        </section>
      </SheetContent>
    </Sheet >
  );
}
