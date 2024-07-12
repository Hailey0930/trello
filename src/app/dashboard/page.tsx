import { Category } from "../_types/Category";

function DashboardPage() {
  const categoryList: Category[] = [{ id: "1", title: "title", cards: [] }];

  return (
    <div>
      {categoryList.map((category) => (
        <div key={category.id}>{category.title}</div>
      ))}
    </div>
  );
}

export default DashboardPage;
