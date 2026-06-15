import { inject, Injectable } from '@angular/core';
import { db } from '../database/dexie';
import { FoodItemEntity } from '../entities/food-item.entity';
import { FoodItemRepository } from '../../domain/repositories/food-item.repository';
import { FoodItemDataSource } from '../datasources/food-item.datasource';
import { BrandDataSource } from '../datasources/brand.datasource';
import { CategoryDataSource } from '../datasources/category.datasource';
import { LocationDataSource } from '../datasources/location.datasource';
import { Brand, Category, FoodItem, Location } from '../../domain/models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodItemRepositoryImpl extends FoodItemRepository {

  private foodDS: FoodItemDataSource = inject(FoodItemDataSource);
  private brandDS: BrandDataSource = inject(BrandDataSource);
  private categoryDS: CategoryDataSource = inject(CategoryDataSource);
  private locationDS: LocationDataSource = inject(LocationDataSource);

  async getAll(): Promise<FoodItem[]> {

    const foodItems = await this.foodDS.getAll();
    const brands = await this.brandDS.getAll();
    const categories = await this.categoryDS.getAll();
    const locations = await this.locationDS.getAll();

    const categoryMap = new Map<number, string>(categories.map(category => [category.id, category.name]));
    const brandMap = new Map<number, string>(brands.map(brand => [brand.id, brand.name]));
    const locationMap = new Map<number, string>(locations.map(location => [location.id, location.name]));

    return foodItems.map(food => {

      const category: Category = {
        name: categoryMap.get(food.category) ?? '',
        id: food.category
      };

      const brand: Brand = {
        id: food.brand,
        name: brandMap.get(food.brand) ?? ''
      };

      const location: Location = {
        id: food.location,
        name: locationMap.get(food.location) ?? ''
      };

      return {
        id: food.id,
        name: food.name,
        category: category,
        brand: brand,
        location: location,
        quantity: food.quantity,
        bestBefore: food.bestBefore,
        openedDate: food.openedDate
      };
    });
  }

  async getItem(id: number): Promise<FoodItemEntity | undefined> {
    return await db.foodItem.get(id);
  }

  async save(item: FoodItem): Promise<number> {
    const entity: FoodItemEntity = {
      id: item.id,
      name: item.name,
      bestBefore: item.bestBefore,
      category: item.category?.id ?? 0,
      brand: item.brand?.id ?? 0,
      location: item.location?.id ?? 0,
      quantity: item.quantity,
      openedDate: item.openedDate,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return await db.foodItem.add(entity);
  }

  async updateItem(id: number, item: FoodItemEntity): Promise<number> {
    return await db.foodItem.update(id, item);
  }

  async deleteItem(id: number): Promise<void> {
    return await db.foodItem.delete(id);
  }
  
  
  async getExpiredItems(): Promise<FoodItemEntity[]> {
    const foodItems = await this.foodDS.getAll();
    return foodItems.filter(food => food.bestBefore < new Date());
  }

  async getByBrand(brandId: number): Promise<Brand[]> {
    const brandName = await this.brandDS.getItem(brandId);

    if(!brandName || !brandName.name) {
      return [];
    }

    return [{ id: brandId, name: brandName.name }];
  }

  async getByCategory(categoryId: number): Promise<Category[]> {
    const categoryName = await this.categoryDS.getItem(categoryId);

    if(!categoryName || !categoryName.name) {
      return [];
    }

    return [{ id: categoryId, name: categoryName.name }];
  }

  async getByLocation(locationId: number): Promise<Location[]> {
    const locationName = await this.locationDS.getItem(locationId);

    if(!locationName || !locationName.name) {
      return [];
    }

    return [{ id: locationId, name: locationName.name }];
  }

  // getItemsWithLowQuantity(threshold: number): Signal<FoodItemEntity[]> {
  //   return toSignal(
  //     from(liveQuery(() => db.foodItem.where('quantity').below(threshold).toArray())),
  //     { initialValue: [] as FoodItemEntity[] }
  //   );
  // }
}
