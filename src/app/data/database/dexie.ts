import Dexie, { type EntityTable } from 'dexie';
import { FoodItemEntity } from '../entities/food-item.entity';
import { LocationEntity } from '../entities/location.entity';
import { BrandEntity } from '../entities/brand.entity';
import { CategoryEntity } from '../entities/category.entity';

const db = new Dexie('BBCompanion') as Dexie & {
  foodItem: EntityTable<FoodItemEntity, 'id'>;
  location: EntityTable<LocationEntity, 'id'>;
  brand: EntityTable<BrandEntity, 'id'>;
  category: EntityTable<CategoryEntity, 'id'>;
};

db.version(1).stores({
  foodItem: '++id, name, bestBefore, category, brand, quantity, location, openedDate, createdAt, updatedAt',
  location: '++id, name, createdAt, updatedAt',
  brand: '++id, name, createdAt, updatedAt',
  category: '++id, name, icon, createdAt, updatedAt'
});

// Populate with sample data on first run
// TODO: Maybe add a list of categories to import from an external JSON file?
db.on('populate', async () => {
  await db.category.bulkAdd([
    { name: 'Frigorífico', icon: 'fa-solid fa-ice-cream', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Congelador', icon: 'fa-solid fa-snowflake', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Despensa', icon: 'fa-solid fa-box', createdAt: new Date(), updatedAt: new Date() },
  ]);
});

export { db };
