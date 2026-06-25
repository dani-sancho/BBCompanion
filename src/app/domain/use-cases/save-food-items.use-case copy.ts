import { FoodItem } from "../models/food-item.model";
import { FoodItemRepository } from "../repositories/food-item.repository";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SaveFoodItemsUseCase {

  private foodItemRepo: FoodItemRepository = inject(FoodItemRepository);

  execute(item: FoodItem): Promise<number> {
    return this.foodItemRepo.save(item);
  }
}