import { IDBPDatabase } from "idb";
import { Category } from "@/app/_types/Category";
import { CATEGORY_STORE_NAME } from "@/app/_constant/constants";
import { TrelloDBSchema } from "./db";

const getAllCategories = (
  db: IDBPDatabase<TrelloDBSchema>,
): Promise<Category[]> => {
  return db.getAll(CATEGORY_STORE_NAME);
};

export default getAllCategories;
