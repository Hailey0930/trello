import { CategoryDBSchema } from "@/app/_types/Category";
import { IDBPDatabase, openDB } from "idb";

export const CATEGORY_DB_NAME = "categoryDB";
export const CATEGORY_STORE_NAME = "categories";

export const initializeCategoryDB = async (): Promise<
  IDBPDatabase<CategoryDBSchema>
> => {
  const categoryDB = await openDB<CategoryDBSchema>(CATEGORY_DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(CATEGORY_STORE_NAME)) {
        db.createObjectStore(CATEGORY_STORE_NAME, { keyPath: "id" });
      }
    },
  });

  return categoryDB;
};
