import { createPool } from "slonik";

let pool = null;
function db() {
  return pool;
}

export async function initializeDB() {
  if (!pool) {
    pool = await createPool(appConfig.dbUrl);
  }
  return pool;
}

export default db;
