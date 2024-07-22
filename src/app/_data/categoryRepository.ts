import { IDBPDatabase } from "idb";
import { Category } from "../_types/Category";
import { TrelloDBSchema } from "./middleware/db";
import {
  createCategory,
  getAllCategories,
  putCategory,
} from "./middleware/category.middleware";

export interface CategoryRepository {
  getAll: (db: IDBPDatabase<TrelloDBSchema>) => Promise<Category[]>;
  addCategory: (
    db: IDBPDatabase<TrelloDBSchema>,
    title: string,
  ) => Promise<Category>;
  editCategory: (
    db: IDBPDatabase<TrelloDBSchema>,
    id: string,
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

const editCategory = async (
  db: IDBPDatabase<TrelloDBSchema>,
  id: string,
  title: string,
): Promise<Category> => {
  return putCategory(db, id, title);
};

export const categoryRepository: CategoryRepository = {
  getAll,
  addCategory,
  editCategory,
};
