import { Card } from "./Card";

export interface Category {
  id: string;
  title: string;
  cardList: Card[];
}
