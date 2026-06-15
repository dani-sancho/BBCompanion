import { Injectable } from '@angular/core';
import { CategoryEntity } from '../entities/category.entity';
import { db } from '../database/dexie';

@Injectable({
  providedIn: 'root'
})
export class CategoryRepositoryImpl {

  async getAllCategories(): Promise<CategoryEntity[]> {
    return await db.category.toArray();
  }

  async getItem(id: number): Promise<CategoryEntity | undefined> {
    return await db.category.get(id);
  }

  async addItem(item: CategoryEntity): Promise<number> {
    return await db.category.add(item);
  }

  async updateItem(id: number, item: CategoryEntity): Promise<number> {
    return await db.category.update(id, item);
  }

  async deleteItem(id: number): Promise<void> {
    return await db.category.delete(id);
  }
}
