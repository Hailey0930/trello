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
  onDeleteCategory: (id: string) => Promise<void>;
  onDragCategory: (dragIndex: number, hoverIndex: number) => Promise<void>;
  onCopyCategory: (id: string, newTitle: string) => Promise<void>;
}
