import { Injectable } from '@angular/core';
import { db } from '../database/dexie';
import { LocationEntity } from '../entities/location.entity';

@Injectable({
  providedIn: 'root'
})
export class LocationRepositoryImpl {

  async getAllLocations(): Promise<LocationEntity[]> {
    return await db.location.toArray();
  }

  async getItem(id: number): Promise<LocationEntity | undefined> {
    return await db.location.get(id);
  }

  async addItem(item: LocationEntity): Promise<number> {
    return await db.location.add(item);
  }

  async updateItem(id: number, item: LocationEntity): Promise<number> {
    return await db.location.update(id, item);
  }

  async deleteItem(id: number): Promise<void> {
    return await db.location.delete(id);
  }
}
