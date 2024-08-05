"use client";

import { Input } from "antd";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PlusOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CategoryRepositoryImpl } from "../_data/categoryRepository";
import Category from "./_components/Category";
import { Category as ICategory } from "../_types/Category";
import useClickOutside from "./_hooks/useClickOutside";
import { DBContext } from "../DBProvider";

function DashboardPage() {
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const dbInstance = useContext(DBContext);

  const addCategoryBoxRef = useRef<HTMLDivElement>(null);

  const categoryRepository = useMemo(() => {
    return dbInstance ? new CategoryRepositoryImpl(dbInstance) : null;
  }, [dbInstance]);

  const fetchCategories = useCallback(async () => {
    if (!categoryRepository) return;

    const categories = await categoryRepository.getAll();
    setCategoryList(categories);
  }, [categoryRepository]);

  useEffect(() => {
    fetchCategories();
  }, [dbInstance, fetchCategories]);

  useClickOutside(setIsAddingCategory, addCategoryBoxRef);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryTitle(e.target.value);
  };

  const handleSaveCategory = async () => {
    if (newCategoryTitle.trim() === "" || !categoryRepository) return;

    await categoryRepository.add(newCategoryTitle);
    fetchCategories();
    setIsAddingCategory(false);
    setNewCategoryTitle("");
  };

  const onEditCategory = async (id: string, title: string) => {
    if (!categoryRepository) return;

    await categoryRepository.edit(id, title);
    fetchCategories();
  };

  const onDeleteCategory = async (id: string) => {
    if (!categoryRepository) return;

    await categoryRepository.remove(id);
    fetchCategories();
  };

  const onDragCategory = async (dragIndex: number, hoverIndex: number) => {
    if (!categoryRepository) return;

    const updatedCategoryList = [...categoryList];
    const [moved] = updatedCategoryList.splice(dragIndex, 1);
    updatedCategoryList.splice(hoverIndex, 0, moved);

    const reorderedCategoryList = updatedCategoryList.map(
      (category, index) => ({
        ...category,
        order: index,
      }),
    );

    setCategoryList(reorderedCategoryList);
    await categoryRepository.updateAll(reorderedCategoryList);
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
