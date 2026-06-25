import { FoodItem } from "../models/food-item.model";
import { FoodItemRepository } from "../repositories/food-item.repository";
import { inject, Injectable, Provider } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GetFoodItemsUseCase {

  private foodItemRepo: FoodItemRepository = inject(FoodItemRepository);

  execute(): Promise<FoodItem[]> {
    return this.foodItemRepo.getAll();
  }
}