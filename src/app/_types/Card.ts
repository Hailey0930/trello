export type CardType = "normal" | "template";

export interface Card {
  id: string;
  title: string;
  type: CardType;
  order: number;
}

export interface CardProps {
  title: string;
  type: CardType;
}
