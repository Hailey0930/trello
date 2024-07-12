import { categoryRepository } from "../_data/categoryRepository";
import Category from "./_components/Category";

function DashboardPage() {
  const categoryList = categoryRepository.getAll();

  return (
    <div>
      <header className="h-14 bg-sky-400 flex items-center pl-5 text-white">
        <div>Dashboard</div>
      </header>
      <div className="p-3 flex gap-2">
        {categoryList.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
