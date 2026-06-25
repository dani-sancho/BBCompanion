export interface FoodItem {
  id: number;
  name: string;
  category: Category;
  brand: Brand;
  location: Location;
  quantity: number;
  bestBefore: Date;
  openedDate?: Date;
  dateStatus?: number;
}

export interface Category {
  name?: string;
  id?: number;
}

export interface Brand {
  name?: string;
  id?: number;
}

export interface Location {
  name?: string;
  id?: number;
}
