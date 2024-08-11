import { Category } from "@/app/_types/Category";

export default function reorderCategories(
  categoryList: Category[],
  startIndex: number,
  endIndex: number,
): Category[] {
  if (
    startIndex < 0 ||
    endIndex < 0 ||
    startIndex >= categoryList.length ||
    endIndex >= categoryList.length ||
    startIndex === endIndex
  ) {
    return [...categoryList];
  }

  const updatedCategoryList = [...categoryList];
  const [moved] = updatedCategoryList.splice(startIndex, 1);
  updatedCategoryList.splice(endIndex, 0, moved);

  return updatedCategoryList.map((category, index) => ({
    ...category,
    order: index,
  }));
}
