import { Component, computed, inject, signal } from '@angular/core';
import { ItemDisplay } from '../../components/item-display/item-display';
import { itemDisplayConfig } from '../../components/item-display/item-display.interface';
import { Modal } from '../../components/modal/modal';

import { GetFoodItemsUseCase } from '../../../domain/use-cases/get-food-items.use-case';
import { SaveFoodItemsUseCase } from '../../../domain/use-cases/save-food-items.use-case copy';
import { itemIconEnum } from '../../components/item-display/item-display.constants';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [ItemDisplay, Modal, MatInputModule, MatButtonModule],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly getFoodItemsUseCase: GetFoodItemsUseCase = inject(GetFoodItemsUseCase);
  private readonly saveFoodItemsUseCase: SaveFoodItemsUseCase = inject(SaveFoodItemsUseCase);

  isModalOpen = false;

  expiredItems = computed(() => {
    return this.itemsDisplay()?.filter((item) => item.dateStatus === 0) || [];
  });

  expiringSoonItems = computed(() => {
    return this.itemsDisplay()?.filter((item) => item.dateStatus === 1) || [];
  });

  goodItems = computed(() => {
    return this.itemsDisplay()?.filter((item) => item.dateStatus === 2) || [];
  });

  sections = computed(() => {
    return [
      {
        title: 'Caducados',
        data: () => this.expiredItems(),
      },
      {
        title: 'Esta semana',
        data: () => this.expiringSoonItems(),
      },
      {
        title: 'A largo plazo',
        data: () => this.goodItems(),
      },
    ];
  });

  //TODO: Add IndexedDB data
  itemsDisplay = signal<itemDisplayConfig[]>([
    {
      id: '1',
      name: 'Leche',
      category: 'Lácteos',
      dueDate: new Date('2026-12-28'),
      icon: itemIconEnum.milk,
      dateStatus: 2,
    },
    {
      id: '2',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(),
      icon: itemIconEnum.droplet,
      dateStatus: 0,
    },
    {
      id: '3',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(),
      icon: itemIconEnum.droplet,
      dateStatus: 0,
    },
    {
      id: '4',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(),
      icon: itemIconEnum.droplet,
      dateStatus: 0,
    },
    {
      id: '5',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(),
      icon: itemIconEnum.droplet,
      dateStatus: 0,
    },
    {
      id: '6',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(),
      icon: itemIconEnum.droplet,
      dateStatus: 0,
    },
    {
      id: '7',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(),
      icon: itemIconEnum.droplet,
      dateStatus: 0,
    },
    {
      id: '8',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 15)),
      icon: itemIconEnum.snowflake,
      dateStatus: 1,
    },
    {
      id: '9',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(),
      icon: itemIconEnum.refrigerator,
      dateStatus: 0,
    },
    {
      id: '10',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      icon: itemIconEnum.croissant,
      dateStatus: 1,
    },
    {
      id: '11',
      name: 'Yogurt',
      category: 'Lácteos',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 9)),
      icon: itemIconEnum.milk,
      dateStatus: 1,
    },
  ]);

  //Todo: This has to be removed, its a test for indexedDB saving data
  ola(item: itemDisplayConfig) {
    this.saveFoodItemsUseCase
      .execute({
        id: 0,
        name: item.name,
        category: {
          name: item.category,
        },
        brand: {
          name: 'test',
        },
        location: {
          name: 'test',
        },
        quantity: 1,
        bestBefore: item.dueDate,
      })
      .then(() => {
        console.log('vamos ninio');
        this.getAllItems();
      });
  }

  //Todo: This has to be removed, its a test for indexedDB getting data
  getAllItems() {
    this.getFoodItemsUseCase.execute().then((items) => {
      console.log(items);
    });
  }

  changeTheme() {
    document.body.classList.toggle('dark');
  }
}
