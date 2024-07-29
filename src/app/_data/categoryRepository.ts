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
  getAll: () => Promise<Category[]>;
  add: (title: string) => Promise<Category>;
  edit: (id: string, title: string) => Promise<Category>;
  remove: (id: string) => Promise<void>;
}

export class CategoryRepositoryFactory implements CategoryRepository {
  constructor(private db: IDBPDatabase<TrelloDBSchema>) {
    this.db = db;
  }

  getAll = async (): Promise<Category[]> => {
    return getAllCategories(this.db);
  };

  add = async (title: string) => {
    return createCategory(this.db, title);
  };

  edit = async (id: string, title: string) => {
    return putCategory(this.db, id, title);
  };

  remove = async (id: string) => {
    return deleteCategory(this.db, id);
  };
}
