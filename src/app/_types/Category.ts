import { Dispatch, SetStateAction } from "react";
import { Card } from "./Card";

export interface Category {
  id: string;
  title: string;
  order: number;
  cards: Card[];
}

export interface CategoryProps {
  index: number;
  category: Category;
  onEditCategory: (id: string, title: string) => Promise<void>;
  onDeleteCategory: (
    id: string,
    removeCardsByCategoryId: (categoryId: string) => Promise<void>,
  ) => Promise<void>;
  onDragCategory: (dragIndex: number, hoverIndex: number) => Promise<void>;
  onCopyCategory: (id: string, newTitle: string) => Promise<void>;
  categoryCount: number;
}

export interface CategoryFooterProps {
  onSaveCard: (title: string) => Promise<void>;
  onGetTemplateCards: (
    setTemplateCardList: Dispatch<SetStateAction<Card[]>>,
  ) => Promise<void>;
  onAddTemplateCard: (title: string) => Promise<void>;
}
