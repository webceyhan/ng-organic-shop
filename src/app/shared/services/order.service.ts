import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Order, OrderItem } from '../models/order';
import { BasketItem } from '../models/basket';
import { Shipping } from '../models/Shipping';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private db: AngularFireDatabase) {}

    store(order: Order) {
        return this.db.list('orders').push(order);
    }

    // HELPERS /////////////////////////////////////////////////////////////////////////////////////

    prepare(shipping: Shipping, basketItems: BasketItem[]) {
        const items = this.prepareItems(basketItems);
        const timestamp = new Date().getTime();

        return { timestamp, shipping, items } as Order;
    }

    private prepareItems(items: BasketItem[]) {
        return items.map(
            ({ title, imageUrl, price, quantity }) =>
                ({
                    title,
                    imageUrl,
                    price,
                    quantity,
                    total: price * quantity,
                } as OrderItem)
        );
    }
}
