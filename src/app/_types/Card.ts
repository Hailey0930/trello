export type CardType = "normal" | "template";

export interface Card {
  id: string;
  title: string;
  type: CardType;
  order: number;
  categoryId: string;
}

export interface CardProps {
  card: Card;
  cardIndex: number;
  onDragCard: (dragIndex: number, hoverIndex: number) => void;
}
