import { BasketItem } from './basket-item';

export interface Basket {
    [key: string]: BasketItem;
}
