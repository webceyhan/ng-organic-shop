import { Shipping } from './Shipping';

export interface OrderItem {
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
    total: number;
}

export interface Order {
    items: OrderItem[];
    shipping: Shipping;
    timestamp: number;
}
