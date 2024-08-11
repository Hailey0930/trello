import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import { CategoryProps } from "@/app/_types/Category";
import mockCardList from "@/app/_data/mock/cardFactory";
import useClickOutside from "../_hooks/useClickOutside";
import Card from "./Card";
import useDragItem from "../_hooks/dnd/useDragItem";
import useDropItem from "../_hooks/dnd/useDropItem";

function Category({
  index,
  category,
  onEditCategory,
  onDeleteCategory,
  onDragCategory,
}: CategoryProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState(category.title);
  const [isMoreVisible, setIsMoreVisible] = useState(false);

  const dragRef = useRef<HTMLDivElement>(null);
  const editTitleInputRef = useRef<HTMLDivElement>(null);
  const moreModalRef = useRef<HTMLDivElement>(null);

  useClickOutside(setIsEditingTitle, editTitleInputRef);
  useClickOutside(setIsMoreVisible, moreModalRef);

  const { isDragging, drag } = useDragItem("category", category.id, index);
  const { handlerId, drop } = useDropItem(dragRef, index, onDragCategory);
  drag(drop(dragRef));

  const opacity = isDragging ? 0 : 1;

  const handleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleEditFinish = async () => {
    await onEditCategory(category.id, newCategoryTitle);
    setIsEditingTitle(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategoryTitle(e.target.value);
  };

  const handleDelete = async () => {
    await onDeleteCategory(category.id);
  };

  const handleMore = () => {
    setIsMoreVisible((prev) => !prev);
  };

  return (
    <div
      ref={dragRef}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="w-272 h-fit bg-gray-100 rounded-lg p-2 cursor-pointer"
    >
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
          <button
            type="button"
            className="rounded-full px-1 hover:bg-gray-200"
            onClick={handleDelete}
          >
            <DeleteOutlined style={{ color: "#5c5b5b" }} />
          </button>
          <div className="relative" ref={moreModalRef}>
            <button
              type="button"
              className="rounded-full px-1 hover:bg-gray-200"
              onClick={handleMore}
            >
              <MoreOutlined style={{ color: "#5c5b5b" }} />
            </button>
            {isMoreVisible && (
              <div className="absolute left-0 top-7 bg-white p-2 rounded-lg shadow-md">
                <button
                  type="button"
                  className="w-full text-left hover:bg-gray-100 rounded-lg px-2 py-1"
                >
                  Copy
                </button>
                <button
                  type="button"
                  className="w-full text-left hover:bg-gray-100 rounded-lg px-2 py-1"
                >
                  Move
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="py-1.5">
        <div className="flex flex-col gap-3">
          {mockCardList.map((card) => (
            <Card key={card.id} title={card.title} type={card.type} />
          ))}
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
