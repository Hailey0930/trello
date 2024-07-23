import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import { CategoryProps } from "@/app/_types/Category";
import { categoryRepository } from "@/app/_data/categoryRepository";
import useClickOutside from "../_hooks/useClickOutside";

function Category({ category, dbInstance, fetchCategories }: CategoryProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState(category.title);

  const editTitleInputRef = useRef<HTMLDivElement>(null);

  useClickOutside(setIsEditingTitle, editTitleInputRef);

  const handleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleEditFinish = async () => {
    if (!dbInstance) return;

    await categoryRepository.edit(dbInstance, category.id, newCategoryTitle);
    fetchCategories();
    setIsEditingTitle(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategoryTitle(e.target.value);
  };

  return (
    <div className="w-272 h-fit bg-gray-100 rounded-lg p-2">
      <div
        className="flex items-center justify-between"
        ref={editTitleInputRef}
      >
        {isEditingTitle ? (
          <Input
            autoFocus
            onChange={handleInputChange}
            value={newCategoryTitle}
          />
        ) : (
          <h1 className="font-medium px-2">{category.title}</h1>
        )}
        <div className="flex items-center gap-1">
          {isEditingTitle ? (
            <button
              type="button"
              className="rounded-full px-1 hover:bg-gray-200"
              onClick={handleEditFinish}
            >
              <CheckOutlined style={{ color: "#5c5b5b" }} />
            </button>
          ) : (
            <button
              type="button"
              className="rounded-full px-1 hover:bg-gray-200"
              onClick={handleEdit}
            >
              <EditOutlined style={{ color: "#5c5b5b" }} />
            </button>
          )}
          <button type="button" className="rounded-full px-1 hover:bg-gray-200">
            <DeleteOutlined style={{ color: "#5c5b5b" }} />
          </button>
        </div>
      </div>
      <footer className="p-2">
        <button
          type="button"
          className="flex items-center gap-2 text-sm bg-sky-300 text-white px-2 py-1 rounded-lg hover:bg-sky-400"
        >
          <PlusOutlined />
          <div> Add Card</div>
        </button>
      </footer>
    </div>
  );
}

export default Category;
