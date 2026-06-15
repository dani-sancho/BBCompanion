import { FoodItem, Category, Brand, Location } from "../models/food-item.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export abstract class FoodItemRepository {

  abstract getAll(): Promise<FoodItem[]>;

  abstract getByCategory(categoryId: number): Promise<Category[]>;

  abstract getByBrand(brandId: number): Promise<Brand[]>;

  abstract getByLocation(locationId: number): Promise<Location[]>;

  abstract save(item: FoodItem): Promise<number>;
}