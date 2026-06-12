import { Component } from '@angular/core';
import { ItemDisplay } from '../../components/item-display/item-display';
import { itemDisplayConfig } from '../../components/item-display/item-display.interface';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-dashboard',
  imports: [ItemDisplay, Modal],
  templateUrl: './dashboard.html',
})
export class Dashboard {

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
    console.log(item);
  }

  isModalOpen = false;
}
