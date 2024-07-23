"use client";

import { Input } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { IDBPDatabase } from "idb";
import { categoryRepository } from "../_data/categoryRepository";
import Category from "./_components/Category";
import { Category as ICategory } from "../_types/Category";
import useClickOutside from "./_hooks/useClickOutside";
import { initializeDB, TrelloDBSchema } from "../_data/middleware/db";
import { CATEGORY_STORE_NAME } from "../_constant/constants";

function DashboardPage() {
  const [dbInstance, setDbInstance] =
    useState<IDBPDatabase<TrelloDBSchema> | null>(null);
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const addCategoryBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initDB = async () => {
      if (!dbInstance) {
        setDbInstance(
          await initializeDB([CATEGORY_STORE_NAME, CATEGORY_STORE_NAME]),
        );
      }
      return dbInstance;
    };

    if (!dbInstance) initDB();
  }, [dbInstance]);

  const fetchCategories = useCallback(async () => {
    if (dbInstance) {
      const categories = await categoryRepository.getAll(dbInstance);
      setCategoryList(categories);
    }
  }, [dbInstance]);

  useEffect(() => {
    fetchCategories();
  }, [dbInstance, fetchCategories]);

  useClickOutside(setIsAddingCategory, addCategoryBoxRef);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryTitle(e.target.value);
  };

  const handleSaveCategory = async () => {
    if (newCategoryTitle.trim() === "" || !dbInstance) return;

    await categoryRepository.add(dbInstance, newCategoryTitle);
    fetchCategories();
    setIsAddingCategory(false);
    setNewCategoryTitle("");
  };

  const onEditFinish = async (id: string, title: string) => {
    if (!dbInstance) return;

    await categoryRepository.edit(dbInstance, id, title);
    fetchCategories();
  };

  return (
    <div>
      <header className="h-14 bg-sky-400 flex items-center pl-5 text-white">
        <div>Dashboard</div>
      </header>
      <div className="p-3 flex gap-2 ">
        {categoryList.map((category) => (
          <Category
            key={category.id}
            category={category}
            onEditFinish={onEditFinish}
          />
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
              value={newCategoryTitle}
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
