import { Input } from "antd";
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

        <div className="w-272 bg-gray-100 rounded-lg p-2">
          <h1 className="font-medium">Add Category</h1>
          <footer className="p-2">
            <Input placeholder="Category name" />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
