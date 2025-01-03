import Image from "next/image"
import Link from "next/link";
import { TypographyH4 } from "./Typography";
const DownloadPage = () => {
  return (
    <span className="flex flex-col justify-center">
      <TypographyH4 message="Download App" />
      <Link href="test">
        <Image src="/images/gplay.png" alt="logo" width={200} height={200} />
      </Link>
      <Link href="test" className="ml-3">
        <Image src="/images/appstore.svg" alt="logo" width={180} height={180} />
      </Link>
    </span>
  )
}
export default DownloadPage;
