import { Category } from "../_types/Category";
import {
  createCategory,
  getAllCategories,
} from "./middleware/category.middleware";
import { initializeCategoryDB } from "./middleware/db";
// import mockCategoryList from "./mock/categoryFactory";

export interface CategoryRepository {
  getAll: () => Promise<Category[]>;
  addCategory: (title: string) => Promise<Category>;
}

const initDB = initializeCategoryDB();

const getAll = async (): Promise<Category[]> => {
  const db = await initDB;
  return getAllCategories(db);
};

const addCategory = async (title: string): Promise<Category> => {
  const db = await initDB;
  return createCategory(db, title);
};

export const categoryRepository: CategoryRepository = {
  getAll,
  addCategory,
};
