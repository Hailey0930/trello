"use client";

import { Input } from "antd";
import { useEffect, useRef, useState } from "react";

import { categoryRepository } from "../_data/categoryRepository";
import Category from "./_components/Category";
import { Category as ICategory } from "../_types/Category";
import useClickOutside from "./_hooks/useClickOutside";

function DashboardPage() {
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const addCategoryBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCategoryList(categoryRepository.getAll());
  }, []);

  const [isAddingCategory, setIsAddingCategory] = useState(false);

  useClickOutside(setIsAddingCategory, addCategoryBoxRef);

  return (
    <div>
      <header className="h-14 bg-sky-400 flex items-center pl-5 text-white">
        <div>Dashboard</div>
      </header>
      <div className="p-3 flex gap-2">
        {categoryList.map((category) => (
          <Category key={category.id} category={category} />
        ))}

        <div className="w-272 bg-gray-100 rounded-lg ">
          {isAddingCategory ? (
            <div ref={addCategoryBoxRef}>
              <h1>Add category</h1>
              <Input placeholder="Category name" autoFocus />
              <div>
                <button
                  type="button"
                  className="bg-green-500 text-white rounded-lg p-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-lg p-2"
                  onClick={() => setIsAddingCategory(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              className="w-full h-full bg-gray-100 rounded-lg p-2"
              type="button"
              onClick={() => setIsAddingCategory(true)}
            >
              Add category
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
