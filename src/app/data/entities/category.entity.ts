import { BaseEntity } from "./global.entity";

export interface CategoryEntity extends BaseEntity {
    name: string;
    icon: string;
}
