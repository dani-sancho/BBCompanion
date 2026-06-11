import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { itemDisplayConfig, itemType } from './item-display.interface';

@Component({
  selector: 'app-item-display',
  imports: [],
  templateUrl: './item-display.html',
  styleUrl: './item-display.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDisplay {
  config = input<itemDisplayConfig[]>();
  type = input<itemType>('block');

  itemHandler = output<itemDisplayConfig>()

  typeClasses = computed(() => {
    if (this.type() === 'list') {
      return 'bg-blue-500';
    }
    
    return 'bg-zinc-200 p-4 rounded-2xl justify-between hover:bg-zinc-300 transition-all duration-200 cursor-pointer';
  })

  onClickItem(item: itemDisplayConfig) {
    this.itemHandler.emit(item);
  }

}
