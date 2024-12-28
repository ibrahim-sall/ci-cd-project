import { connectDb, dbConfigFromEnv } from "./database";
import { setupApp } from "./app";

let port = 9999;
async function main() {


  if (process.env.PORT) {
    port = parseInt(process.env.PORT, 10);
  }

  const db = await connectDb(dbConfigFromEnv());

  setupApp(db).listen(port, () => {
    console.log(`Server is running on port ${port.toString()}`);
  })
}

main().catch((e: unknown) => { console.error(`Something went wrong ${e as string}`); });
