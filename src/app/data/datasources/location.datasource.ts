import { Injectable, inject } from '@angular/core';
import { LocationEntity } from '../entities/location.entity';
import { db } from '../database/dexie';
import { Dexie } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class LocationDataSource extends Dexie {

  async getAll(): Promise<LocationEntity[]> {
    return await db.location.toArray();
  }

  async getItem(id: number): Promise<LocationEntity | undefined> {
    return await db.location.get(id);
  }

  async addLocation(item: LocationEntity): Promise<number> {
    return await db.location.add(item);
  }

  async updateLocation(id: number, item: LocationEntity): Promise<number> {
    return await db.location.update(id, item);
  }

  async deleteLocation(id: number): Promise<void> {
    return await db.location.delete(id);
  }
}
