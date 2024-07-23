import { IDBPDatabase } from "idb";
import { Category } from "../_types/Category";
import { TrelloDBSchema } from "./middleware/db";
import {
  createCategory,
  getAllCategories,
} from "./middleware/category.middleware";

export interface CategoryRepository {
  getAll: (db: IDBPDatabase<TrelloDBSchema>) => Promise<Category[]>;
  addCategory: (
    db: IDBPDatabase<TrelloDBSchema>,
    title: string,
  ) => Promise<Category>;
}

const getAll = async (
  db: IDBPDatabase<TrelloDBSchema>,
): Promise<Category[]> => {
  return getAllCategories(db);
};

const addCategory = async (
  db: IDBPDatabase<TrelloDBSchema>,
  title: string,
): Promise<Category> => {
  return createCategory(db, title);
};

export const categoryRepository: CategoryRepository = {
  getAll,
  addCategory,
};
