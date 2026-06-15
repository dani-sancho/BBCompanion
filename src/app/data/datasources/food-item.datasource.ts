import { Injectable, inject } from '@angular/core';
import { FoodItemEntity } from '../entities/food-item.entity';
import { db } from '../database/dexie';
import { Dexie } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class FoodItemDataSource extends Dexie {

  async getAll(): Promise<FoodItemEntity[]> {
    return await db.foodItem.toArray();
  }

  async getFoodItem(id: number): Promise<FoodItemEntity | undefined> {
    return await db.foodItem.get(id);
  }

  async addFoodItem(item: FoodItemEntity): Promise<number> {
    return await db.foodItem.add(item);
  }

  async updateFoodItem(id: number, item: FoodItemEntity): Promise<number> {
    return await db.foodItem.update(id, item);
  }

  async deleteFoodItem(id: number): Promise<void> {
    return await db.foodItem.delete(id);
  }
}
