import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
  output,
} from '@angular/core';
import { itemDisplayConfig, itemType } from './item-display.interface';
import {
  itemDisplayBlockClasses,
  itemDisplayColorClasses,
  itemDisplayListClasses,
  itemDisplayIcon,
  itemDisplayCounter,
  keyboardNavigationClasses,
} from './item-display.constants';
import { SvgIconComponent } from '../svg-icon/svg-icon';
import { ExpirationDatePipe } from '../../pipes/expiration-date/expiration-date-pipe';

@Component({
  selector: 'app-item-display',
  imports: [CommonModule, SvgIconComponent, ExpirationDatePipe],
  templateUrl: './item-display.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDisplay {
  config = input<itemDisplayConfig[]>();
  type = input<itemType>('block');
  title = input<string>();

  itemHandler = output<itemDisplayConfig>();

  @HostBinding('class')
  rootClass = 'block m-5';

  itemDisplayIcon = itemDisplayIcon;
  itemDisplayCounter = itemDisplayCounter;

  typeClasses = computed(() => {
    let displayClasses = itemDisplayBlockClasses.box;

    if (this.type() === 'list') {
      displayClasses = itemDisplayListClasses.box;
    }

    return `${displayClasses} ${itemDisplayColorClasses} ${keyboardNavigationClasses}`;
  });

  containerClasses = computed(() => {
    let containerClasses = itemDisplayBlockClasses.container;

    if (this.type() === 'list') {
      containerClasses = itemDisplayListClasses.container;
    }

    return containerClasses;
  });

  onClickItem(item: itemDisplayConfig) {
    this.itemHandler.emit(item);
  }
}
