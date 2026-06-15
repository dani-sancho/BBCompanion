import { Injectable } from '@angular/core';
import { BrandEntity } from '../entities/brand.entity';
import { db } from '../database/dexie';

@Injectable({
  providedIn: 'root'
})
export class BrandRepositoryImpl {

  async getAllBrands(): Promise<BrandEntity[]> {
    return await db.brand.toArray();
  }

  async getItem(id: number): Promise<BrandEntity | undefined> {
    return await db.brand.get(id);
  }

  async addItem(item: BrandEntity): Promise<number> {
    return await db.brand.add(item);
  }

  async updateItem(id: number, item: BrandEntity): Promise<number> {
    return await db.brand.update(id, item);
  }

  async deleteItem(id: number): Promise<void> {
    return await db.brand.delete(id);
  }
}
