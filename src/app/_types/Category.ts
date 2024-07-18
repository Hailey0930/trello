import { CATEGORY_STORE_NAME } from "../_data/middleware/db";
import { Card } from "./Card";

export interface CategoryDBSchema {
  [CATEGORY_STORE_NAME]: Category;
}

export interface Category {
  id: string;
  title: string;
  cards: Card[];
}
