import { FixtureFactory } from "@reflow-work/test-fixture-factory";
import { Category } from "../_types/Category";

export interface CategoryRepository {
  getAll: () => Category[];
}

const categoryFactory = new FixtureFactory<Category>(() => {
  return { id: "1", title: "title", cards: [] };
});

const [category1, category2] = categoryFactory.createList(2);

const getAll = () => {
  return [category1, category2];
};

export const categoryRepository: CategoryRepository = {
  getAll,
};
