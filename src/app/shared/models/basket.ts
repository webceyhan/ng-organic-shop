import { Product } from './product';

export interface BasketItem extends Product {
    quantity: number;
}

export interface Basket {
    items: { [key: string]: BasketItem };
    timestamp: number;
}
