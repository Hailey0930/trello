import { categoryRepository } from "../_data/categoryRepository";

function DashboardPage() {
  const categoryList = categoryRepository.getAll();

  return (
    <div>
      <header className="h-14 bg-sky-400 flex items-center pl-5 text-white">
        <div>Dashboard</div>
      </header>
      <div>
        {categoryList.map((category) => (
          <div
            key={category.id}
            className="w-1/2 border-solid border-2 border-sky-500"
          >
            {category.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
