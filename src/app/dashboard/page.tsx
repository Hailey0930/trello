import { categoryRepository } from "../_data/categoryRepository";

function DashboardPage() {
  const categoryList = categoryRepository.getAll();

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
