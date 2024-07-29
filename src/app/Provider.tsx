"use client";

import { IDBPDatabase } from "idb";
import { createContext, ReactNode, useEffect, useState } from "react";
import { initializeDB, TrelloDBSchema } from "./_data/db";
import { CARD_STORE_NAME, CATEGORY_STORE_NAME } from "./_constant/constants";

export const DBContext = createContext<IDBPDatabase<TrelloDBSchema> | null>(
  null,
);

export function Provider({ children }: { children: ReactNode }) {
  const [dbInstance, setDbInstance] =
    useState<IDBPDatabase<TrelloDBSchema> | null>(null);

  useEffect(() => {
    const initDB = async () => {
      const db = await initializeDB([CATEGORY_STORE_NAME, CARD_STORE_NAME]);
      setDbInstance(db);
    };

    initDB();
  }, []);

  return <DBContext.Provider value={dbInstance}>{children}</DBContext.Provider>;
}
