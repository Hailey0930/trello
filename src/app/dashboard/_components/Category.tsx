import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Input, Select } from "antd";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CategoryProps } from "@/app/_types/Category";
import { Card as ICard } from "@/app/_types/Card";
import { CardRepository } from "@/app/_data/cardRepository";
import { useTheme } from "next-themes";
import useClickOutside from "../_hooks/useClickOutside";
import Card from "./Card";
import useDragItem from "../_hooks/dnd/useDragItem";
import useDropItem from "../_hooks/dnd/useDropItem";
import CategoryFooter from "./CategoryFooter";

function Category({
  index,
  category,
  onEditCategory,
  onDeleteCategory,
  onDragCategory,
  onCopyCategory,
  categoryCount,
}: CategoryProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState(category.title);
  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [isCopyModalVisible, setIsCopyModalVisible] = useState(false);
  const [newCategoryCopyTitle, setNewCategoryCopyTitle] = useState(
    category.title,
  );
  const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(index + 1);
  const [cardList, setCardList] = useState<ICard[]>([]);

  const dragRef = useRef<HTMLDivElement>(null);
  const editTitleInputRef = useRef<HTMLDivElement>(null);
  const moreModalRef = useRef<HTMLDivElement>(null);
  const copyModalRef = useRef<HTMLDivElement>(null);
  const moveModalRef = useRef<HTMLDivElement>(null);

  useClickOutside(setIsEditingTitle, editTitleInputRef);
  useClickOutside(setIsMoreVisible, moreModalRef);
  useClickOutside(setIsCopyModalVisible, copyModalRef);
  useClickOutside(setIsMoveModalVisible, moveModalRef, isDropdownOpen);

  const { theme } = useTheme();

  const { isDragging, drag } = useDragItem("category", category.id, index);
  const { handlerId, drop } = useDropItem(dragRef, index, onDragCategory);
  drag(drop(dragRef));

  const opacity = isDragging ? 0 : 1;

  const fetchCards = useCallback(async () => {
    const categories = await CardRepository.getAll(category.id);
    setCardList(categories);
  }, [category.id]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

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
    await onDeleteCategory(category.id, CardRepository.removeCardsByCategoryId);
  };

  const handleMore = () => {
    setIsMoreVisible((prev) => !prev);
  };

  const handleCopyModal = () => {
    setIsCopyModalVisible(true);
    setIsMoreVisible(false);
  };

  const handleCopyTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategoryCopyTitle(e.target.value);
  };

  const handleCopy = async () => {
    await onCopyCategory(category.id, newCategoryCopyTitle);
    setIsCopyModalVisible(false);
  };

  const handleMoveModal = () => {
    setIsMoveModalVisible(true);
    setIsMoreVisible(false);
  };

  const positionOptions = Array.from({ length: categoryCount }, (_, i) => ({
    value: i + 1,
    label: i === index ? `${i + 1} (current)` : `${i + 1}`,
  }));

  const handlePositionChange = (value: number) => {
    setSelectedPosition(value);
  };

  const handleMove = async () => {
    const newPosition = selectedPosition - 1;

    if (newPosition !== index) {
      await onDragCategory(index, newPosition);
    }

    setIsMoveModalVisible(false);
  };

  const onSaveCard = async (newCardTitle: string) => {
    if (newCardTitle.trim() === "") return;

    await CardRepository.add(newCardTitle, category.id);
    fetchCards();
  };

  const onGetTemplateCards = async (
    setTemplateCardList: Dispatch<SetStateAction<ICard[]>>,
  ) => {
    const templateCards = await CardRepository.getTemplateCards(category.id);
    setTemplateCardList(templateCards);
  };

  const onAddTemplateCard = async (title: string) => {
    await CardRepository.addTemplateCard(title, category.id);
    fetchCards();
  };

  return (
    <div
      ref={dragRef}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="w-272 h-fit bg-gray-100 rounded-lg p-2 cursor-pointer dark:bg-slate-500 dark:text-white"
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
            className="dark:bg-slate-600 dark:text-white dark:border-slate-600 dark:placeholder-white"
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
              <CheckOutlined
                style={{ color: theme === "light" ? "#5c5b5b" : "#ffffff" }}
              />
            </button>
          ) : (
            <button
              type="button"
              className="rounded-full px-1 hover:bg-gray-200"
              onClick={handleEdit}
            >
              <EditOutlined
                style={{ color: theme === "light" ? "#5c5b5b" : "#ffffff" }}
              />
            </button>
          )}
          <button
            type="button"
            className="rounded-full px-1 hover:bg-gray-200"
            onClick={handleDelete}
          >
            <DeleteOutlined
              style={{ color: theme === "light" ? "#5c5b5b" : "#ffffff" }}
            />
          </button>
          <div className="relative" ref={moreModalRef}>
            <button
              type="button"
              className="rounded-full px-1 hover:bg-gray-200"
              onClick={handleMore}
            >
              <MoreOutlined
                style={{ color: theme === "light" ? "#5c5b5b" : "#ffffff" }}
              />
            </button>
            {isMoreVisible && (
              <div className="absolute left-0 top-7 bg-white p-2 w-28 rounded-lg shadow-md">
                <button
                  type="button"
                  className="w-full text-left hover:bg-gray-100 rounded-lg px-2 py-1"
                  onClick={handleCopyModal}
                >
                  Copy
                </button>
                <button
                  type="button"
                  className="w-full text-left hover:bg-gray-100 rounded-lg px-2 py-1"
                  onClick={handleMoveModal}
                >
                  Move
                </button>
              </div>
            )}
            {isCopyModalVisible && (
              <div
                className="absolute left-0 top-7 bg-white p-2 w-32 rounded-lg shadow-md"
                ref={copyModalRef}
              >
                <div className="flex flex-col mb-5 gap-2">
                  <h1 className="font-semibold">Name</h1>
                  <Input
                    type="text"
                    placeholder="Category name"
                    value={newCategoryCopyTitle}
                    onChange={handleCopyTitleChange}
                  />
                </div>
                <button
                  type="button"
                  className="w-full flex justify-center items-center text-left bg-sky-300 text-white px-2 py-1 rounded-lg hover:bg-sky-400 text-sm"
                  onClick={handleCopy}
                >
                  Copy
                </button>
              </div>
            )}
            {isMoveModalVisible && (
              <div
                className="absolute left-0 top-7 bg-white p-2 w-32 rounded-lg shadow-md"
                ref={moveModalRef}
              >
                <div className="flex flex-col mb-5 gap-2">
                  <h1 className="font-semibold">Position</h1>
                  <Select
                    options={positionOptions}
                    defaultValue={index + 1}
                    onChange={handlePositionChange}
                    onDropdownVisibleChange={(open) => setIsDropdownOpen(open)}
                  />
                </div>
                <button
                  type="button"
                  className="w-full flex justify-center items-center text-left bg-sky-300 text-white px-2 py-1 rounded-lg hover:bg-sky-400 text-sm"
                  onClick={handleMove}
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
          {cardList.map((card) => (
            <Card key={card.id} title={card.title} type={card.type} />
          ))}
        </div>
      </div>
      <CategoryFooter
        onSaveCard={onSaveCard}
        onGetTemplateCards={onGetTemplateCards}
        onAddTemplateCard={onAddTemplateCard}
      />
    </div>
  );
}

export default Category;
