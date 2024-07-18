import { IDBPDatabase } from "idb";
import { Category, CategoryDBSchema } from "@/app/_types/Category";
import { v4 as uuidv4 } from "uuid";
import { CATEGORY_STORE_NAME } from "./db";

export const getAllCategories = (
  db: IDBPDatabase<CategoryDBSchema>,
): Promise<Category[]> => {
  return db.getAll(CATEGORY_STORE_NAME);
};

export const createCategory = (
  db: IDBPDatabase<CategoryDBSchema>,
  title: string,
) => {
  const newCategory = {
    id: uuidv4(),
    title,
    cards: [],
  };

  db.add(CATEGORY_STORE_NAME, newCategory);
  return newCategory;
};
