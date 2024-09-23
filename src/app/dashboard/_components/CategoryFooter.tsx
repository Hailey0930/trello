import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useRef, useState } from "react";
import { CategoryFooterProps } from "@/app/_types/Category";
import useClickOutside from "../_hooks/useClickOutside";

function CategoryFooter({ onSaveCard }: CategoryFooterProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const addCardRef = useRef<HTMLDivElement>(null);

  useClickOutside(setIsAddingCard, addCardRef);

  const handleAddCardButtonClick = async () => {
    setIsAddingCard(true);
  };

  const handleSaveCardClick = async () => {
    await onSaveCard(newCardTitle);
    setIsAddingCard(false);
    setNewCardTitle("");
  };

  const handleCancelSaveCard = () => {
    setIsAddingCard(false);
    setNewCardTitle("");
  };

  return (
    <footer className="p-2">
      <button
        type="button"
        className="flex items-center gap-2 text-sm bg-sky-300 text-white px-2 py-1 rounded-lg hover:bg-sky-400"
        onClick={handleAddCardButtonClick}
      >
        <PlusOutlined />
        <div> Add Card</div>
      </button>
      {isAddingCard && (
        <div className="flex flex-col gap-2 mt-2" ref={addCardRef}>
          <Input
            placeholder="Card name"
            autoFocus
            onChange={(e) => setNewCardTitle(e.target.value)}
            value={newCardTitle}
          />
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              className="bg-emerald-400 text-white rounded-lg px-2 py-1 font-semibold"
              onClick={handleSaveCardClick}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-rose-600 text-white rounded-lg px-2 py-1 font-semibold"
              onClick={handleCancelSaveCard}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

export default CategoryFooter;
