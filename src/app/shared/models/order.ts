import { Model } from './model';
import { Shipping } from './shipping';
import { User } from './user';

export interface OrderItem extends Model {
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
    total: number;
}

export interface Order extends Model {
    userId: string;
    user?: User;
    items: OrderItem[];
    shipping: Shipping;
    total?: number;
}
