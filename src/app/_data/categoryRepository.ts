import { IDBPDatabase } from "idb";
import { Category } from "../_types/Category";
import getAllCategories from "./middleware/category.middleware";
import { TrelloDBSchema } from "./middleware/db";

export interface CategoryRepository {
  getAll: (db: IDBPDatabase<TrelloDBSchema>) => Promise<Category[]>;
}

const getAll = async (
  db: IDBPDatabase<TrelloDBSchema>,
): Promise<Category[]> => {
  return getAllCategories(db);
};

export const categoryRepository: CategoryRepository = {
  getAll,
};
