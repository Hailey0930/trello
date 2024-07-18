import { Category } from "../_types/Category";
import getAllCategories from "./middleware/category.middleware";
import { initializeCategoryDB } from "./middleware/db";
// import mockCategoryList from "./mock/categoryFactory";

export interface CategoryRepository {
  getAll: () => Promise<Category[]>;
}

const initDB = initializeCategoryDB();

const getAll = async (): Promise<Category[]> => {
  const db = await initDB;
  return getAllCategories(db);
};

export const categoryRepository: CategoryRepository = {
  getAll,
};
