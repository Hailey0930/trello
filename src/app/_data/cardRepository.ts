import { IDBPDatabase } from "idb";
import { Card } from "../_types/Card";
import { TrelloDBSchema } from "./db";
import { CARD_STORE_NAME } from "../_constant/constants";

export interface CardRepository {
  getAll: () => Promise<Card[]>;
}

export class CardRepositoryImpl implements CardRepository {
  constructor(private db: IDBPDatabase<TrelloDBSchema>) {
    this.db = db;
  }

  getAll = async (): Promise<Card[]> => {
    const allCards = await this.db.getAll(CARD_STORE_NAME);
    return allCards.sort((a, b) => a.order - b.order);
  };
}
