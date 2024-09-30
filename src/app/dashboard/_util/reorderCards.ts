import { Card } from "@/app/_types/Card";

export default function reorderCards(
  cardList: Card[],
  startIndex: number,
  endIndex: number,
): Card[] {
  if (
    startIndex < 0 ||
    endIndex < 0 ||
    startIndex >= cardList.length ||
    endIndex >= cardList.length ||
    startIndex === endIndex
  ) {
    return [...cardList];
  }

  const updatedCardList = [...cardList];
  const [moved] = updatedCardList.splice(startIndex, 1);
  updatedCardList.splice(endIndex, 0, moved);

  return updatedCardList.map((category, index) => ({
    ...category,
    order: index,
  }));
}
