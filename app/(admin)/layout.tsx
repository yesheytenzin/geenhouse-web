import Navbar from "@/components/Navbar";
import SideBar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ThemeToggler";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute right-0 p-5 mr-3 z-10">
            <ModeToggle />
          </div>
        </ThemeProvider>
        <Navbar />
      </header>
      <main className="min-h-screen">
        <SideBar />
        {children}
      </main>
    </>
  );
}
