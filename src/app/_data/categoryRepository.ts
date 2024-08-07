import { IDBPDatabase } from "idb";
import { Category } from "../_types/Category";
import { TrelloDBSchema } from "./middleware/db";
import {
  createCategory,
  deleteCategory,
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
  remove: (db: IDBPDatabase<TrelloDBSchema>, id: string) => Promise<void>;
}

const getAll = async (
  db: IDBPDatabase<TrelloDBSchema>,
): Promise<Category[]> => {
  return getAllCategories(db);
};

const add = async (db: IDBPDatabase<TrelloDBSchema>, title: string) => {
  return createCategory(db, title);
};

const edit = async (
  db: IDBPDatabase<TrelloDBSchema>,
  id: string,
  title: string,
) => {
  return putCategory(db, id, title);
};

const remove = async (db: IDBPDatabase<TrelloDBSchema>, id: string) => {
  return deleteCategory(db, id);
};

export const categoryRepository: CategoryRepository = {
  getAll,
  add,
  edit,
  remove,
};
