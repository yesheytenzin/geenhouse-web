import { getUser } from "@/lib/session";
import { format } from "date-fns"

export default async function UserLabel() {
  const user = await getUser();
  const date = format(new Date(), "EEEE, MMMM do, yyyy");
  return (
    <div className="ml-2">
      <h1 className="prose">Hi {user?.name}</h1>
      <p className="prose">{date}</p>
    </div>
  );
}
