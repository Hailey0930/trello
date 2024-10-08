import { IDBPDatabase } from "idb";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../_types/Card";
import { TrelloDBSchema } from "./db";
import { CARD_STORE_NAME } from "../_constant/constants";

export interface CardRepository {
  getAll: (categoryId: string) => Promise<Card[]>;
  getTemplateCards: (categoryId: string) => Promise<Card[]>;
  add: (title: string, categoryId: string) => Promise<Card>;
  addTemplateCard: (title: string, categoryId: string) => Promise<Card>;
  removeCardsByCategoryId: (categoryId: string) => Promise<void>;
}

export class CardRepositoryImpl implements CardRepository {
  constructor(private db: IDBPDatabase<TrelloDBSchema>) {
    this.db = db;
  }

  getAll = async (categoryId: string): Promise<Card[]> => {
    const allCards = await this.db.getAll(CARD_STORE_NAME);
    const filteredCards = allCards.filter(
      (card) => card.categoryId === categoryId,
    );
    return filteredCards.sort((a, b) => a.order - b.order);
  };

  getTemplateCards = async (): Promise<Card[]> => {
    const allCards = await this.db.getAll(CARD_STORE_NAME);
    const filteredCards = allCards.filter((card) => card.type === "template");
    return filteredCards.sort((a, b) => a.order - b.order);
  };

  add = async (title: string, categoryId: string) => {
    const cards = await this.getAll(categoryId);
    const newOrder = cards.length;
    const newCard: Card = {
      id: uuidv4(),
      title,
      type: "normal",
      order: newOrder,
      categoryId,
    };

    await this.db.add(CARD_STORE_NAME, newCard);
    return newCard;
  };

  addTemplateCard = async (title: string, categoryId: string) => {
    const cards = await this.getAll(categoryId);
    const newOrder = cards.length;
    const newCard: Card = {
      id: uuidv4(),
      title,
      type: "template",
      order: newOrder,
      categoryId,
    };

    await this.db.add(CARD_STORE_NAME, newCard);
    return newCard;
  };

  removeCardsByCategoryId = async (categoryId: string) => {
    const allCards = await this.getAll(categoryId);
    await Promise.all(
      allCards.map((card) => this.db.delete(CARD_STORE_NAME, card.id)),
    );
  };
}
