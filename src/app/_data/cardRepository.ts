import { v4 as uuidv4 } from "uuid";
import { Card } from "../_types/Card";
import { db } from "./db";

export interface ICardRepository {
  getAll: (categoryId: string) => Promise<Card[]>;
  getTemplateCards: (categoryId: string) => Promise<Card[]>;
  add: (title: string, categoryId: string) => Promise<Card>;
  addTemplateCard: (title: string, categoryId: string) => Promise<Card>;
  removeCardsByCategoryId: (categoryId: string) => Promise<void>;
  updateAll: (cards: Card[]) => Promise<void>;
}

export const CardRepository: ICardRepository = {
  getAll: async (categoryId: string): Promise<Card[]> => {
    const allCardsWithCategoryId = await db.card
      .where({ categoryId })
      .toArray();
    return allCardsWithCategoryId.sort((a, b) => a.order - b.order);
  },

  getTemplateCards: async (): Promise<Card[]> => {
    const allCardsWithTemplateType = await db.card
      .where({ type: "template" })
      .toArray();
    return allCardsWithTemplateType.sort((a, b) => a.order - b.order);
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

  updateAll: async (cards: Card[]): Promise<void> => {
    await db.transaction("rw", db.card, async () => {
      await Promise.all(cards.map((card) => db.card.put(card)));
    });
  },
};
