import Dexie, { type EntityTable } from "dexie";
import { Category } from "../_types/Category";
import { Card } from "../_types/Card";

const db = new Dexie("TrelloDatabase") as Dexie & {
  category: EntityTable<
    Category,
    "id" // primary key "id" (for the typings only)
  >;
  card: EntityTable<
    Card,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  category: "++id, title, order, cards", // primary key "id" (for the runtime!)
  card: "++id, title, type, order, categoryId", // primary key "id" (for the runtime!)
});

export type { Category, Card };
export { db };
