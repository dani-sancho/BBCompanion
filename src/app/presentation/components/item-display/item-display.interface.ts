import { itemIcon } from './item-display.constants';

export interface itemDisplayConfig {
  id: string;
  name: string;
  category: string;
  dueDate: Date;
  dateStatus: number;
  icon?: itemIcon;
}

export const itemTypes = {
  list: 'list',
  block: 'block',
} as const;

export type itemType = (typeof itemTypes)[keyof typeof itemTypes];
