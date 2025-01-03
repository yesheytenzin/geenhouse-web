import * as bcrypt from "bcrypt";
import { db } from "@/lib/db";

async function main() {
  const hashedPassword = await bcrypt.hash("adminatgsc", 10);

  const admin = await db.admin.create({
    data: {
      username: "gscadmin",
      email: "admin@example.com",
      password: hashedPassword,
      isSuper: true,
    },
  });
  console.log({ admin });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
