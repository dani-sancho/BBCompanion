import { BaseEntity } from "./global.entity";

export interface FoodItemEntity extends BaseEntity {
    name: string;
    bestBefore: Date;
    category: number;
    brand: number;
    quantity: number;
    location: number;
    openedDate?: Date;
}