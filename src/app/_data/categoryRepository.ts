import { Category } from "../_types/Category";
import mockCategoryList from "./mock/categoryFactory";

export interface CategoryRepository {
  getAll: () => Category[];
}

const getAll = () => {
  return mockCategoryList;
};

export const categoryRepository: CategoryRepository = {
  getAll,
};
