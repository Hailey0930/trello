import { Card } from "@/app/_types/Card";
import { Category } from "@/app/_types/Category";
import { DBSchema, IDBPDatabase, openDB } from "idb";
import {
  CARD_STORE_NAME,
  CATEGORY_STORE_NAME,
} from "@/app/_constant/constants";

export const DB_NAME = "trelloDB";

export interface TrelloDBSchema extends DBSchema {
  categories: {
    key: string;
    value: Category;
    indexes: { "by-title": string };
  };
  cards: {
    key: string;
    value: Card;
    indexes: { "by-categoryId": string };
  };
}

export const initializeDB = async (
  storeNames: (typeof CATEGORY_STORE_NAME | typeof CARD_STORE_NAME)[],
): Promise<IDBPDatabase<TrelloDBSchema>> => {
  const initializedDB = await openDB<TrelloDBSchema>(DB_NAME, 1, {
    upgrade(db) {
      storeNames.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      });
    },
  });

  return initializedDB;
};
