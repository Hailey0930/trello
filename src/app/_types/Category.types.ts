import { Card } from "./Card.types";

export interface Category {
  id: string;
  title: string;
  cardList: Card[];
}
