import { Injectable, inject } from '@angular/core';
import { BrandEntity } from '../entities/brand.entity';
import { db } from '../database/dexie';
import { Dexie } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class BrandDataSource extends Dexie {

  async getAll(): Promise<BrandEntity[]> {
    return await db.brand.toArray();
  }

  async getItem(id: number): Promise<BrandEntity | undefined> {
    return await db.brand.get(id);
  }

  async addBrand(item: BrandEntity): Promise<number> {
    return await db.brand.add(item);
  }

  async updateBrand(id: number, item: BrandEntity): Promise<number> {
    return await db.brand.update(id, item);
  }

  async deleteBrand(id: number): Promise<void> {
    return await db.brand.delete(id);
  }
}
