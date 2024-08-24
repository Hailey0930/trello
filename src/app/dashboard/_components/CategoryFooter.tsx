/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  ArrowLeftOutlined,
  CloseOutlined,
  CopyOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { useRef, useState } from "react";
import { CategoryFooterProps } from "@/app/_types/Category";
import { Card as ICard } from "@/app/_types/Card";
import useClickOutside from "../_hooks/useClickOutside";
import Card from "./Card";

function CategoryFooter({
  onSaveCard,
  onGetTemplateCards,
  onAddTemplateCard,
}: CategoryFooterProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isSelectingTemplate, setIsSelectingTemplate] = useState(false);
  const [templateCardList, setTemplateCardList] = useState<ICard[]>([]);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [newTemplateTitle, setNewTemplateTitle] = useState("");

  const addCardRef = useRef<HTMLDivElement>(null);
  const templateModalRef = useRef<HTMLDivElement>(null);
  const selectTemplateRef = useRef<HTMLDivElement>(null);
  const templateTitleRef = useRef<HTMLDivElement>(null);

  useClickOutside(setIsAddingCard, addCardRef);
  useClickOutside(setIsTemplateModalVisible, templateModalRef);
  useClickOutside(setIsSelectingTemplate, selectTemplateRef);
  useClickOutside(setIsCreatingTemplate, templateTitleRef);

  const handleAddCard = async () => {
    setIsAddingCard(true);
  };

  const handleSaveCard = async () => {
    await onSaveCard(newCardTitle);
    setIsAddingCard(false);
    setNewCardTitle("");
  };

  const handleCancelSaveCard = () => {
    setIsAddingCard(false);
    setNewCardTitle("");
  };

  const handleTemplate = () => {
    setIsTemplateModalVisible(!isTemplateModalVisible);
    onGetTemplateCards(setTemplateCardList);
  };

  const handleCloseTemplateModal = () => {
    setIsTemplateModalVisible(false);
    setIsCreatingTemplate(false);
  };

  const handleSelectTemplate = () => {
    setIsSelectingTemplate(true);
    setIsTemplateModalVisible(false);
  };

  const handleBackToTemplate = () => {
    setIsSelectingTemplate(false);
    setIsTemplateModalVisible(true);
  };

  const handleCloseSelectTemplate = () => {
    setIsSelectingTemplate(false);
  };

  const handleCreateCard = () => {
    setIsCreatingTemplate(true);
  };

  const handleCancelCreateCard = () => {
    setIsCreatingTemplate(false);
    setNewTemplateTitle("");
  };

  const handleAddTemplateCard = async () => {
    await onAddTemplateCard(newTemplateTitle);
    setIsCreatingTemplate(false);
    setNewTemplateTitle("");
    setIsTemplateModalVisible(false);
  };

  return (
    <footer className="relative p-2 flex justify-between items-center">
      <button
        type="button"
        className="flex items-center gap-2 text-sm bg-sky-300 text-white px-2 py-1 rounded-lg hover:bg-sky-400"
        onClick={handleAddCard}
      >
        <PlusOutlined />
        <div> Add Card</div>
      </button>
      <button
        type="button"
        className=" rounded-full px-1 hover:bg-gray-200"
        onClick={handleTemplate}
      >
        <CopyOutlined style={{ color: "#5c5b5b" }} />
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
              onClick={handleSaveCard}
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
      {isTemplateModalVisible && (
        <div
          className="absolute left-full top-5 z-10 bg-white p-2 w-64 rounded-lg shadow-md"
          ref={templateModalRef}
        >
          <div className="relative flex flex-col justify-center items-center mb-5 gap-2">
            <h1 className="font-semibold">Card Templates</h1>
            <button
              type="button"
              className="absolute right-0 top-0 rounded-full px-1 hover:bg-gray-200"
              onClick={handleCloseTemplateModal}
            >
              <CloseOutlined style={{ color: "#5c5b5b" }} />
            </button>
            <div className="flex flex-col justify-center items-center gap-2 w-full mt-2">
              {templateCardList.length > 0 ? (
                templateCardList.map((card) => (
                  <div
                    className="w-full"
                    key={card.id}
                    onClick={handleSelectTemplate}
                  >
                    <Card title="test" type="template" />
                  </div>
                ))
              ) : (
                <div className="w-full text-xs text-center">
                  You don’t have any templates. <br /> Create a template to make
                  copying cards easy.
                </div>
              )}
            </div>
            {isCreatingTemplate && (
              <div
                className="flex flex-col gap-1 w-full"
                ref={templateTitleRef}
              >
                <Input
                  type="text"
                  placeholder="Template title"
                  autoFocus
                  value={newTemplateTitle}
                  onChange={(e) => setNewTemplateTitle(e.target.value)}
                />
                <div className="flex gap-2 item-center">
                  <button
                    type="button"
                    className="flex justify-center items-center text-sm bg-sky-300 text-white px-2 py-1 rounded-lg hover:bg-sky-400"
                    onClick={handleAddTemplateCard}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="rounded-full px-1 hover:bg-gray-200"
                    onClick={handleCancelCreateCard}
                  >
                    <CloseOutlined style={{ color: "#5c5b5b" }} />
                  </button>
                </div>
              </div>
            )}
            <button
              type="button"
              className="flex items-center justify-center gap-2 mt-2 w-full px-1 hover:bg-gray-200"
              onClick={handleCreateCard}
            >
              <PlusOutlined style={{ color: "#5c5b5b" }} />
              Create a new template
            </button>
          </div>
        </div>
      )}
      {isSelectingTemplate && (
        <div
          className="absolute left-full top-5 z-10 bg-white p-2 w-64  rounded-lg shadow-md"
          ref={selectTemplateRef}
        >
          <div className="relative flex flex-col justify-center items-center mb-5 gap-2">
            <div className="flex justify-between items-center w-full">
              <button
                type="button"
                className="rounded-full px-1 hover:bg-gray-200"
                onClick={handleBackToTemplate}
              >
                <ArrowLeftOutlined style={{ color: "#5c5b5b" }} />
              </button>
              <h1 className="font-semibold">Create card</h1>
              <button
                type="button"
                className="rounded-full px-1 hover:bg-gray-200"
                onClick={handleCloseSelectTemplate}
              >
                <CloseOutlined style={{ color: "#5c5b5b" }} />
              </button>
            </div>
            <Input type="text" placeholder="Card name" />
          </div>
          <button
            type="button"
            className="w-full flex justify-center items-center text-sm bg-sky-300 text-white px-2 py-1 rounded-lg hover:bg-sky-400"
          >
            Create card
          </button>
        </div>
      )}
    </footer>
  );
}

export default CategoryFooter;
