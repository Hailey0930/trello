"use client";

import { Input } from "antd";
import { useEffect, useRef, useState } from "react";

import { categoryRepository } from "../_data/categoryRepository";
import Category from "./_components/Category";
import { Category as ICategory } from "../_types/Category";
import useClickOutside from "./_hooks/useClickOutside";
import { PlusOutlined } from "@ant-design/icons";

function DashboardPage() {
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const addCategoryBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCategoryList(categoryRepository.getAll());
  }, []);

  useClickOutside(setIsAddingCategory, addCategoryBoxRef);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleSaveCategory = () => {
    setCategoryList((prev) => {
      const newCategoryList = [...prev];

      const tempCategory: ICategory = {
        id: (newCategoryList.length + 1).toString(),
        title: newCategory,
        cards: [],
      };

      newCategoryList.push(tempCategory);

      return newCategoryList;
    });

    setIsAddingCategory(false);
    setNewCategory("");
  };

  return (
    <div>
      <header className="h-14 bg-sky-400 flex items-center pl-5 text-white">
        <div>Dashboard</div>
      </header>
      <div className="p-3 flex gap-2 ">
        {categoryList.map((category) => (
          <Category key={category.id} category={category} />
        ))}

        {isAddingCategory ? (
          <div
            ref={addCategoryBoxRef}
            className="w-272 bg-gray-100 rounded-lg flex flex-col justify-center items-center gap-1"
          >
            <h1 className="font-semibold">Add category</h1>
            <Input
              placeholder="Category name"
              autoFocus
              onChange={handleInputChange}
              value={newCategory}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="bg-emerald-400 text-white rounded-lg px-2 py-1 font-semibold"
                onClick={handleSaveCategory}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-rose-600 text-white rounded-lg px-2 py-1 font-semibold"
                onClick={() => setIsAddingCategory(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="w-272 h-10 bg-gray-100 rounded-lg">
            <button
              className="w-full h-full bg-gray-100 rounded-lg p-2 flex justify-center items-center hover:bg-gray-200 font-semibold gap-2"
              type="button"
              onClick={() => setIsAddingCategory(true)}
            >
              <PlusOutlined />
              Add category
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
