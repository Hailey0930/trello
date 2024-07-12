import { Category } from "../_types/Category";

export interface CategoryRepository {
  getAll: () => Category[];
}

const getAll = () => {
  return [
    { id: "1", title: "title", cards: [] },
    { id: "2", title: "title2", cards: [] },
  ];
};

export const categoryRepository: CategoryRepository = {
  getAll,
};
