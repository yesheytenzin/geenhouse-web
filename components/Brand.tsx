import logo from "@/public/images/logo.png";
import Image from "next/image";

export default function Brand() {
  return (
    <div className="flex-1 ml-4 mt-2 ">
      <Image draggable={false} src={logo} alt="Logo" width={100} height={100} />
    </div>
  );
}
