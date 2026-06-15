import { Injectable } from '@angular/core';
import { CategoryEntity } from '../entities/category.entity';
import { db } from '../database/dexie';
import { Dexie } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataSource extends Dexie {

  async getAll(): Promise<CategoryEntity[]> {
    return await db.category.toArray();
  }

  async getItem(id: number): Promise<CategoryEntity | undefined> {
    return await db.category.get(id);
  }

  async addCategory(item: CategoryEntity): Promise<number> {
    return await db.category.add(item);
  }

  async updateCategory(id: number, item: CategoryEntity): Promise<number> {
    return await db.category.update(id, item);
  }

  async deleteCategory(id: number): Promise<void> {
    return await db.category.delete(id);
  }
}
