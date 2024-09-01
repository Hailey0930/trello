import { v4 as uuidv4 } from "uuid";
import { Category } from "../_types/Category";
import { Card } from "../_types/Card";
import { db } from "./db";

export interface ICategoryRepository {
  getAll: () => Promise<Category[]>;
  add: (title: string, cards?: Card[]) => Promise<Category>;
  edit: (id: string, title: string) => Promise<Category>;
  remove: (
    id: string,
    removeCardsByCategoryId: (categoryId: string) => Promise<void>,
  ) => Promise<void>;
  updateAll: (categories: Category[]) => Promise<void>;
}

export const CategoryRepository: ICategoryRepository = {
  getAll: async (): Promise<Category[]> => {
    const allCategories = await db.category.toArray();
    return allCategories.sort((a, b) => a.order - b.order);
  },

  add: async (title: string, cards?: Card[]): Promise<Category> => {
    const categories = await CategoryRepository.getAll();
    const newOrder = categories.length;
    const newCategory: Category = {
      id: uuidv4(),
      title,
      order: newOrder,
      cards: cards || [],
    };

    await db.category.add(newCategory);
    return newCategory;
  },

  edit: async (id: string, title: string): Promise<Category> => {
    const targetCategory = await db.category.get(id);

    if (!targetCategory) {
      throw new Error(`Category : ${id} not found`);
    }

    const editedCategory = {
      ...targetCategory,
      title,
    };

    await db.category.put(editedCategory);

    return editedCategory;
  },

  remove: async (
    id: string,
    removeCardsByCategoryId: (categoryId: string) => Promise<void>,
  ): Promise<void> => {
    const targetCategory = await db.category.get(id);

    if (!targetCategory) {
      throw new Error(`Category : ${id} not found`);
    }

    await db.category.delete(id);
    await removeCardsByCategoryId(id);
  },

  updateAll: async (categories: Category[]): Promise<void> => {
    await db.transaction("rw", db.category, async () => {
      await Promise.all(
        categories.map((category) => db.category.put(category)),
      );
    });
  },
};
