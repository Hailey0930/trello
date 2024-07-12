import { Category as ICategory } from "@/app/_types/Category";

interface Props {
  category: ICategory;
}

function Category({ category }: Props) {
  return (
    <div className="w-272 bg-gray-100 rounded-lg p-2">
      <h1 className="font-medium">{category.title}</h1>
      <footer className="p-2">
        <button
          type="button"
          className="text-sm bg-sky-300 text-white px-2 py-1 rounded-lg"
        >
          Add Card
        </button>
      </footer>
    </div>
  );
}

export default Category;
