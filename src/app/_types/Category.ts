import { Card } from "./Card";

export interface Category {
  id: string;
  title: string;
  cards: Card[];
}

export interface CategoryProps {
  category: Category;
  onEditFinish: (id: string, title: string) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
}
