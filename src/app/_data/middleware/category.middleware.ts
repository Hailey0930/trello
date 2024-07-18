import { IDBPDatabase } from "idb";
import { Category, CategoryDBSchema } from "@/app/_types/Category";
import { CATEGORY_STORE_NAME } from "./db";

const getAllCategories = (
  db: IDBPDatabase<CategoryDBSchema>,
): Promise<Category[]> => {
  return db.getAll(CATEGORY_STORE_NAME);
};

export default getAllCategories;
