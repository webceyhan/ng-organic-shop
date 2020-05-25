import { Shipping } from './Shipping';
import { User } from './user';

export interface OrderItem {
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
    total: number;
}

export interface Order {
    key?: string;
    userId: string;
    user?: User;
    items: OrderItem[];
    shipping: Shipping;
    timestamp: number;
}
