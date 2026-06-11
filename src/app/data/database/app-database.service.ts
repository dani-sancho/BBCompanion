import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

// Example generic interface to represent an item in the DB.
// You should replace this with your actual domain models later.
export interface SyncQueueItem {
  id?: number;
  createdAt: number;
  payload: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class AppDatabase extends Dexie {
  // Define tables here. The generic type represents the model, and the second type is the primary key.
  // Note: Since each device has its own IndexedDB, this data is strictly local.
  usuarios!: Table<SyncQueueItem, number>;

  constructor() {
    // The name of the database
    super('BBCompanionDB');

    // Define the schema for versions. 
    // If you change the schema later, you increment the version number.
    this.version(1).stores({
      // primary key "id" (auto-incremented), and we might want to query by "operation" or "createdAt"
      syncQueue: '++id, operation, createdAt' 
    });
  }
}
