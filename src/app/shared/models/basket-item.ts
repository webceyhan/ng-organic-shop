import { Product } from './product';

export interface BasketItem {
    product: Product;
    quantity: number;
    price: number;
}
