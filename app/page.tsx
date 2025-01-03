import { getUser } from "@/lib/session";
import { ParticlesComponent } from "@/components/particles/Particles";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { TypewriterEffect } from "@/components/Typewriter";
import Icons from "@/components/Icons";

export default async function Home() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-hero w-full">
      <ParticlesComponent />
      <header className="flex justify-end">
        <Link
          href="/auth/login"
          className={cn(
            `text-white text-md m-2 p-2 bg-green-500 font-bold rounded-sm flex  hover:bg-white  hover:text-black`
          )}
        >
          Login as an Admin <Icons.userRound className="ml-1 hover:bg-black" />
        </Link>
      </header>
      <div className="flex flex-col items-center shadow  w-fit ml-16 animate-slide-in">
        <div className="p-5 flex flex-col items-center justify-center">
          <Image
            width={200}
            height={200}
            src="/images/logo.png"
            alt="greenhouse logo"
          />
          <div>
            <h1 className="text-xl font-bold text-white">
              Blending Internet of Things with Modern Agriculture 
            </h1>
          </div>
        </div>
        <div className="mt-5">
          <Link href="/about" className="group">
            <div className="flex space-x-2 bg-green-600 w-fit p-2 rounded-md shadow">
              <span
                className={cn(
                  "hover-underline-animation font-semibold text-white"
                )}
              >
                Get Started
              </span>
            </div>
          </Link>
        </div>
      </div>
      <Footer className="flex space-x-2 absolute bottom-0 right-0 px-2 text-white" />
    </div>
  );
}
