"use client";

import { Input } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Category from "./_components/Category";
import { Category as ICategory } from "../_types/Category";
import useClickOutside from "./_hooks/useClickOutside";
import reorderCategories from "./_util/reorderCategories";
import { CategoryRepository } from "../_data/categoryRepository";

function DashboardPage() {
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const addCategoryBoxRef = useRef<HTMLDivElement>(null);

  const fetchCategories = useCallback(async () => {
    const categories = await CategoryRepository.getAll();
    setCategoryList(categories);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useClickOutside(setIsAddingCategory, addCategoryBoxRef);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryTitle(e.target.value);
  };

  const handleSaveCategory = async () => {
    if (newCategoryTitle.trim() === "") return;

    await CategoryRepository.add(newCategoryTitle);
    fetchCategories();
    setIsAddingCategory(false);
    setNewCategoryTitle("");
  };

  const onEditCategory = async (id: string, title: string) => {
    await CategoryRepository.edit(id, title);
    fetchCategories();
  };

  const onDeleteCategory = async (
    id: string,
    removeCardsByCategoryId: (categoryId: string) => Promise<void>,
  ) => {
    await CategoryRepository.remove(id, removeCardsByCategoryId);
    fetchCategories();
  };

  const onDragCategory = async (startIndex: number, endIndex: number) => {
    if (!CategoryRepository) return;

    const reorderedCategoryList = reorderCategories(
      categoryList,
      startIndex,
      endIndex,
    );

    setCategoryList(reorderedCategoryList);
    await CategoryRepository.updateAll(reorderedCategoryList);
  };

  const onCopyCategory = async (id: string, newTitle: string) => {
    const categoryToCopy = categoryList.find((category) => category.id === id);
    if (!categoryToCopy) return;

    await CategoryRepository.add(newTitle, categoryToCopy.cards);
    fetchCategories();
  };

  return (
    <div>
      <header className="h-14 bg-sky-400 flex items-center pl-5 text-white">
        <div>Dashboard</div>
      </header>
      <DndProvider backend={HTML5Backend}>
        <div className="p-3 flex gap-2 ">
          {categoryList.map((category, index) => (
            <Category
              key={category.id}
              index={index}
              category={category}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              onDragCategory={onDragCategory}
              onCopyCategory={onCopyCategory}
              categoryCount={categoryList.length}
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
      </DndProvider>
    </div>
  );
}

export default DashboardPage;
