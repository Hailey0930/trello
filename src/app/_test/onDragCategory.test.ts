const categoryList = [
  { id: "1", title: "카테고리1", order: 0 },
  { id: "2", title: "카테고리2", order: 1 },
  { id: "3", title: "카테고리3", order: 2 },
  { id: "4", title: "카테고리4", order: 3 },
  { id: "5", title: "카테고리5", order: 4 },
];

const onDragCategory = async (dragIndex: number, hoverIndex: number) => {
  if (
    dragIndex < 0 ||
    hoverIndex < 0 ||
    dragIndex >= categoryList.length ||
    hoverIndex >= categoryList.length ||
    dragIndex === hoverIndex
  ) {
    return [...categoryList];
  }

  const updatedCategoryList = [...categoryList];
  const [moved] = updatedCategoryList.splice(dragIndex, 1);
  updatedCategoryList.splice(hoverIndex, 0, moved);

  const reorderedCategoryList = updatedCategoryList.map((category, index) => ({
    ...category,
    order: index,
  }));

  return reorderedCategoryList;
};

describe("onDragCategory", () => {
  it("카테고리를 중간으로 드래그해서 위치를 옮길 수 있다.", async () => {
    const result = await onDragCategory(3, 2);

    expect(result).toEqual([
      { id: "1", title: "카테고리1", order: 0 },
      { id: "2", title: "카테고리2", order: 1 },
      { id: "4", title: "카테고리4", order: 2 },
      { id: "3", title: "카테고리3", order: 3 },
      { id: "5", title: "카테고리5", order: 4 },
    ]);
  });

  it("카테고리를 가장 처음으로 드래그해서 위치를 옮길 수 있다.", async () => {
    const result = await onDragCategory(3, 0);

    expect(result).toEqual([
      { id: "4", title: "카테고리4", order: 0 },
      { id: "1", title: "카테고리1", order: 1 },
      { id: "2", title: "카테고리2", order: 2 },
      { id: "3", title: "카테고리3", order: 3 },
      { id: "5", title: "카테고리5", order: 4 },
    ]);
  });

  it("카테고리를 가장 마지막으로 드래그해서 위치를 옮길 수 있다.", async () => {
    const result = await onDragCategory(0, 4);

    expect(result).toEqual([
      { id: "2", title: "카테고리2", order: 0 },
      { id: "3", title: "카테고리3", order: 1 },
      { id: "4", title: "카테고리4", order: 2 },
      { id: "5", title: "카테고리5", order: 3 },
      { id: "1", title: "카테고리1", order: 4 },
    ]);
  });

  it("같은 위치로 드래그할 경우 아무 변화가 없다.", async () => {
    const result = await onDragCategory(0, 0);

    expect(result).toEqual(categoryList);
  });

  it("유효하지 않은 위치에 대해 아무 작업도 하지 않는다.", async () => {
    const resultNegativeIndex = await onDragCategory(-1, 2);
    const resultOutOfBounds = await onDragCategory(0, categoryList.length);

    expect(resultNegativeIndex).toEqual(categoryList);
    expect(resultOutOfBounds).toEqual(categoryList);
  });
});
