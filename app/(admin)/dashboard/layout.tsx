import Footer from "@/components/Footer"

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-[73vh]">
        {children}
      </div>
      <Footer className="flex h-5 items-center space-x-4 text-sm lg:my-5 justify-end lg:px-10" />
    </>
  )
}
