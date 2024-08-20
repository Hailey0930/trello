import reorderCategories from "../dashboard/_util/reorderCategories";

const categoryList = [
  { id: "1", title: "카테고리1", order: 0, cards: [] },
  { id: "2", title: "카테고리2", order: 1, cards: [] },
  { id: "3", title: "카테고리3", order: 2, cards: [] },
  { id: "4", title: "카테고리4", order: 3, cards: [] },
  { id: "5", title: "카테고리5", order: 4, cards: [] },
];

describe("onDragCategory", () => {
  it("카테고리를 중간으로 드래그해서 위치를 옮길 수 있다.", async () => {
    const result = await reorderCategories(categoryList, 3, 2);

    expect(result).toEqual([
      { id: "1", title: "카테고리1", order: 0, cards: [] },
      { id: "2", title: "카테고리2", order: 1, cards: [] },
      { id: "4", title: "카테고리4", order: 2, cards: [] },
      { id: "3", title: "카테고리3", order: 3, cards: [] },
      { id: "5", title: "카테고리5", order: 4, cards: [] },
    ]);
  });

  it("카테고리를 가장 처음으로 드래그해서 위치를 옮길 수 있다.", async () => {
    const result = await reorderCategories(categoryList, 3, 0);

    expect(result).toEqual([
      { id: "4", title: "카테고리4", order: 0, cards: [] },
      { id: "1", title: "카테고리1", order: 1, cards: [] },
      { id: "2", title: "카테고리2", order: 2, cards: [] },
      { id: "3", title: "카테고리3", order: 3, cards: [] },
      { id: "5", title: "카테고리5", order: 4, cards: [] },
    ]);
  });

  it("카테고리를 가장 마지막으로 드래그해서 위치를 옮길 수 있다.", async () => {
    const result = await reorderCategories(categoryList, 0, 4);

    expect(result).toEqual([
      { id: "2", title: "카테고리2", order: 0, cards: [] },
      { id: "3", title: "카테고리3", order: 1, cards: [] },
      { id: "4", title: "카테고리4", order: 2, cards: [] },
      { id: "5", title: "카테고리5", order: 3, cards: [] },
      { id: "1", title: "카테고리1", order: 4, cards: [] },
    ]);
  });

  it("같은 위치로 드래그할 경우 아무 변화가 없다.", async () => {
    const result = await reorderCategories(categoryList, 0, 0);

    expect(result).toEqual(categoryList);
  });

  it("유효하지 않은 위치에 대해 아무 작업도 하지 않는다.", async () => {
    const resultNegativeIndex = await reorderCategories(categoryList, -1, 2);
    const resultOutOfBounds = await reorderCategories(
      categoryList,
      0,
      categoryList.length,
    );

    expect(resultNegativeIndex).toEqual(categoryList);
    expect(resultOutOfBounds).toEqual(categoryList);
  });
});
