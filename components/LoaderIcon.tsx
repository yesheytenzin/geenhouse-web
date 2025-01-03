import Icons from "./Icons"
export const LoaderIcon = ({ message }: { message: string }) => {
  return (
    <div className="mx-auto w-fit flex  flex-col flex-1 lg:min-h-[80vh] justify-items-center">
      <div className="w-fit h-fit p-2 my-auto">
        <Icons.loader2 className="animate-spin mx-auto " />
        <h4 className="animate-pulse">{message}</h4>
      </div>
    </div>
  )
}
