import { Card, CardType } from "@/app/_types/Card";
import { faker } from "@faker-js/faker";
import { FixtureFactory } from "@reflow-work/test-fixture-factory";

const cardTypes: CardType[] = ["normal", "template"];

const cardFactory = new FixtureFactory<Card>(() => {
  const randomType = faker.helpers.arrayElement(cardTypes);

  return {
    id: faker.string.uuid(),
    title: faker.word.words(),
    type: randomType,
  };
});

const mockCardList = cardFactory.createList(2);
export default mockCardList;
