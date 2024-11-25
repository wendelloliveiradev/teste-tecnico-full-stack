import { DatabaseSync } from "node:sqlite";
import SqlBricks from "sql-bricks";

const database = new DatabaseSync("./database.sqlite");

function initDB() {
  database.exec(
    `CREATE TABLE IF NOT EXISTS rides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT,
      origin TEXT,
      destination TEXT,
      distance REAL,
      duration TEXT,
      driver_id INTEGER,
      driver_name TEXT,
      value REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );
}

export function insert(table: string, item: Record<string, string>) {

  const {text, values} = SqlBricks.insert(table, item).toParams({ placeholder: '?' });

  const res = database.prepare(text).run(...values);

  console.log(res);
}

export function select(query: string) {
  console.log(query);
  return database.prepare(query).all();
}

initDB();