import { Category } from "../_types/Category";

function DashboardPage() {
  const categoryList: Category[] = [
    { id: "1", title: "title", cards: [] },
    { id: "1", title: "title2", cards: [] },
  ];

  return (
    <div className="flex">
      {categoryList.map((category) => (
        <div
          key={category.id}
          className="w-1/2 border-solid border-2 border-sky-500"
        >
          {category.title}
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;
