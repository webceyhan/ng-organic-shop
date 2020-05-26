import { Model } from './model';
import { Product } from './product';

export interface BasketItem extends Product {
    quantity: number;
}

export interface Basket extends Model {
    items: { [key: string]: BasketItem };
}
