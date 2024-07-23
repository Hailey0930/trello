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
  add: (db: IDBPDatabase<TrelloDBSchema>, title: string) => Promise<Category>;
  edit: (
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

export const categoryRepository: CategoryRepository = {
  getAll,
  add,
  edit,
};
