import { Card } from "./Card";

export interface Category {
  id: string;
  title: string;
  cards: Card[];
}

export interface CategoryProps {
  category: Category;
  onEditCategory: (id: string, title: string) => Promise<void>;
}
