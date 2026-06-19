import { Component, inject } from '@angular/core';
import { ItemDisplay } from '../../components/item-display/item-display';
import { itemDisplayConfig } from '../../components/item-display/item-display.interface';
import { Modal } from '../../components/modal/modal';

import { GetFoodItemsUseCase } from '../../../domain/use-cases/get-food-items.use-case';
import { SaveFoodItemsUseCase } from '../../../domain/use-cases/save-food-items.use-case copy';

@Component({
  selector: 'app-dashboard',
  imports: [ItemDisplay, Modal],
  templateUrl: './dashboard.html',
})
export class Dashboard {

  private readonly getFoodItemsUseCase: GetFoodItemsUseCase = inject(GetFoodItemsUseCase);
  private readonly saveFoodItemsUseCase: SaveFoodItemsUseCase = inject(SaveFoodItemsUseCase);

  itemsDisplay: itemDisplayConfig[] = [
    {
      id: '1',
      name: 'Leche',
      category: 'Lácteos',
      dueDate: new Date(),
    },
    {
      id: '2',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(),
    },
  ];

  ola(item: itemDisplayConfig) {
    this.saveFoodItemsUseCase.execute({
      id: 0,
      name: item.name,
      category: {
        name: item.category
      },
      brand: {
        name: 'test'
      },
      location: {
        name: 'test'
      },
      quantity: 1,
      bestBefore: item.dueDate,
    }).then(() => {
      console.log('vamos ninio');
      this.getAllItems();
    });


  }

  getAllItems() {
    this.getFoodItemsUseCase.execute().then((items) => {
      console.log(items);
    });
  }

  isModalOpen = false;
}
