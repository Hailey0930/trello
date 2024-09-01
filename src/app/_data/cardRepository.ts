import { v4 as uuidv4 } from "uuid";
import { Card } from "../_types/Card";
import { db } from "./db";

export interface ICardRepository {
  getAll: (categoryId: string) => Promise<Card[]>;
  getTemplateCards: (categoryId: string) => Promise<Card[]>;
  add: (title: string, categoryId: string) => Promise<Card>;
  addTemplateCard: (title: string, categoryId: string) => Promise<Card>;
  removeCardsByCategoryId: (categoryId: string) => Promise<void>;
}

export const CardRepository: ICardRepository = {
  getAll: async (categoryId: string): Promise<Card[]> => {
    const allCards = await db.card.toArray();
    const filteredCards = allCards.filter(
      (card) => card.categoryId === categoryId,
    );
    return filteredCards.sort((a, b) => a.order - b.order);
  },

  getTemplateCards: async (): Promise<Card[]> => {
    const allCards = await db.card.toArray();
    const filteredCards = allCards.filter((card) => card.type === "template");
    return filteredCards.sort((a, b) => a.order - b.order);
  },

  add: async (title: string, categoryId: string): Promise<Card> => {
    const cards = await CardRepository.getAll(categoryId);
    const newOrder = cards.length;
    const newCard: Card = {
      id: uuidv4(),
      title,
      type: "normal",
      order: newOrder,
      categoryId,
    };

    await db.card.add(newCard);
    return newCard;
  },

  addTemplateCard: async (title: string, categoryId: string): Promise<Card> => {
    const cards = await CardRepository.getAll(categoryId);
    const newOrder = cards.length;
    const newCard: Card = {
      id: uuidv4(),
      title,
      type: "template",
      order: newOrder,
      categoryId,
    };

    await db.card.add(newCard);
    return newCard;
  },

  removeCardsByCategoryId: async (categoryId: string): Promise<void> => {
    const allCards = await CardRepository.getAll(categoryId);
    await Promise.all(allCards.map((card) => db.card.delete(card.id)));
  },
};
