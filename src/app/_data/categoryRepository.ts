import { IDBPDatabase } from "idb";
import { Category } from "../_types/Category";
import { TrelloDBSchema } from "./middleware/db";
import {
  createCategory,
  deleteCategory as deleteCategoryFromDB,
  getAllCategories,
  putCategory,
} from "./middleware/category.middleware";

export interface CategoryRepository {
  getAll: (db: IDBPDatabase<TrelloDBSchema>) => Promise<Category[]>;
  add: (db: IDBPDatabase<TrelloDBSchema>, title: string) => Promise<Category>;
  edit: (
    db: IDBPDatabase<TrelloDBSchema>,
    id: string,
    title: string,
  ) => Promise<Category>;
  deleteCategory: (
    db: IDBPDatabase<TrelloDBSchema>,
    id: string,
  ) => Promise<void>;
}

const getAll = async (
  db: IDBPDatabase<TrelloDBSchema>,
): Promise<Category[]> => {
  return getAllCategories(db);
};

const add = async (
  db: IDBPDatabase<TrelloDBSchema>,
  title: string,
): Promise<Category> => {
  return createCategory(db, title);
};

const edit = async (
  db: IDBPDatabase<TrelloDBSchema>,
  id: string,
  title: string,
): Promise<Category> => {
  return putCategory(db, id, title);
};

const deleteCategory = async (db: IDBPDatabase<TrelloDBSchema>, id: string) => {
  return deleteCategoryFromDB(db, id);
};

export const categoryRepository: CategoryRepository = {
  getAll,
  add,
  edit,
  deleteCategory,
};
