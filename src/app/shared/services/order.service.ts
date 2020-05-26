import { Injectable } from '@angular/core';

import { DBService } from './db.service';
import { Order, OrderItem } from '../models/order';
import { BasketItem } from '../models/basket';
import { Shipping } from '../models/shipping';

@Injectable({
    providedIn: 'root',
})
export class OrderService extends DBService<Order> {
    path = 'orders';

    listByUser(userId: string) {
        return this.list((ref) => ref.orderByChild('userId').equalTo(userId));
    }

    // HELPERS /////////////////////////////////////////////////////////////////////////////////////

    prepare(userId, shipping: Shipping, basketItems: BasketItem[]) {
        const items: OrderItem[] = basketItems.map(
            ({ title, imageUrl, price, quantity }) => ({
                title,
                imageUrl,
                price,
                quantity,
                total: price * quantity,
            })
        );

        return { userId, shipping, items } as Order;
    }
}
