import { IDBPDatabase } from "idb";
import { Card } from "./Card";
import { TrelloDBSchema } from "../_data/middleware/db";

export interface Category {
  id: string;
  title: string;
  cards: Card[];
}

export interface CategoryProps {
  category: Category;
  dbInstance: IDBPDatabase<TrelloDBSchema> | null;
  fetchCategories: () => Promise<void>;
}
