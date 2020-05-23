import { Product } from './product';

export interface BasketItem extends Product {
    quantity: number;
}

export interface Basket {
    [key: string]: BasketItem;
}
