import { IDBPDatabase } from "idb";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../_types/Category";
import { TrelloDBSchema } from "./db";
import { CATEGORY_STORE_NAME } from "../_constant/constants";
import { Card } from "../_types/Card";

export interface CategoryRepository {
  getAll: () => Promise<Category[]>;
  add: (title: string, cards?: Card[]) => Promise<Category>;
  edit: (id: string, title: string) => Promise<Category>;
  remove: (id: string) => Promise<void>;
  updateAll: (categories: Category[]) => Promise<void>;
}

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private db: IDBPDatabase<TrelloDBSchema>) {
    this.db = db;
  }

  getAll = async (): Promise<Category[]> => {
    const allCategories = await this.db.getAll(CATEGORY_STORE_NAME);
    return allCategories.sort((a, b) => a.order - b.order);
  };

  add = async (title: string, cards?: Card[]) => {
    const categories = await this.getAll();
    const newOrder = categories.length;
    const newCategory = {
      id: uuidv4(),
      title,
      order: newOrder,
      cards: cards || [],
    };

    await this.db.add(CATEGORY_STORE_NAME, newCategory);
    return newCategory;
  };

  edit = async (id: string, title: string) => {
    const targetCategory = await this.db.get(CATEGORY_STORE_NAME, id);

    if (!targetCategory) {
      throw new Error(`Category : ${id} not found`);
    }

    const editedCategory = {
      ...targetCategory,
      title,
    };

    await this.db.put(CATEGORY_STORE_NAME, editedCategory);

    return editedCategory;
  };

  remove = async (id: string) => {
    const targetCategory = await this.db.get(CATEGORY_STORE_NAME, id);

    if (!targetCategory) {
      throw new Error(`Category : ${id} not found`);
    }

    await this.db.delete(CATEGORY_STORE_NAME, id);
  };

  updateAll = async (categories: Category[]) => {
    await Promise.all(
      categories.map((category) => this.db.put(CATEGORY_STORE_NAME, category)),
    );
  };
}
