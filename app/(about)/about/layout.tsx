import Footer from "@/components/Footer";
import Image from "next/image";
import DownloadPage from "@/components/DownloadComponent";

const Layout = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="pt-2 px-2">
        <Image width={100} height={100} src="/images/logo.png" alt="greenhouse logo" />
      </div>
      <div className="mt-10 relative">
        <div className="lg:max-w-[850px] lg:ml-20">
          {children}
        </div>
        <div className="absolute top-[20%] bottom-[50%] right-[10%]">
          <DownloadPage />
        </div>
        <Footer className="flex space-x-2 absolute bottom-0 right-0 px-2 text-white" />
      </div>
    </>
  )
}

export default Layout;
