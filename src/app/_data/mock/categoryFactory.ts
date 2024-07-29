import { Category } from "@/app/_types/Category";
import { faker } from "@faker-js/faker";
import { FixtureFactory } from "@reflow-work/test-fixture-factory";

const categoryFactory = new FixtureFactory<Category>(() => {
  return {
    id: faker.string.uuid(),
    title: faker.word.words(),
    order: 0,
    cards: [],
  };
});

const mockCategoryList = categoryFactory
  .createList(2)
  .map((category, index) => ({
    ...category,
    order: index,
  }));

export default mockCategoryList;
