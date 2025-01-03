import { Separator } from "./ui/separator";
const Footer = ({ className }: { className: string }) => {
  // flex h-5 items-center space-x-4 text-sm absolute bottom-5 right-4
  return (
    <div className={className}>
      <div className="dark:text-white">
        GreensageConnect@{new Date().getFullYear().toString()}
      </div>
      <Separator orientation="vertical" />
      <div className="dark:text-white">www.gsc.bt</div>
    </div>
  );
};
export default Footer;
