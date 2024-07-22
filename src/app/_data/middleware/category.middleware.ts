import { IDBPDatabase } from "idb";
import { Category } from "@/app/_types/Category";
import { CATEGORY_STORE_NAME } from "@/app/_constant/constants";
import { v4 as uuidv4 } from "uuid";
import { TrelloDBSchema } from "./db";

export const getAllCategories = (
  db: IDBPDatabase<TrelloDBSchema>,
): Promise<Category[]> => {
  return db.getAll(CATEGORY_STORE_NAME);
};

export const createCategory = (
  db: IDBPDatabase<TrelloDBSchema>,
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

export const putCategory = async (
  db: IDBPDatabase<TrelloDBSchema>,
  id: string,
  title: string,
) => {
  const targetCategory = await db.get(CATEGORY_STORE_NAME, id);

  if (!targetCategory) {
    throw new Error(`Category : ${id} not found`);
  }

  const editedCategory = {
    ...targetCategory,
    title,
  };

  db.put(CATEGORY_STORE_NAME, editedCategory);

  return editedCategory;
};

export const deleteCategory = async (
  db: IDBPDatabase<TrelloDBSchema>,
  id: string,
) => {
  const targetCategory = await db.get(CATEGORY_STORE_NAME, id);

  if (!targetCategory) {
    throw new Error(`Category : ${id} not found`);
  }

  db.delete(CATEGORY_STORE_NAME, id);
};
