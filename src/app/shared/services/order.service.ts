import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { BasketService } from './basket.service';
import { Order, OrderItem } from '../models/order';
import { BasketItem } from '../models/basket';
import { Shipping } from '../models/Shipping';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(
        private db: AngularFireDatabase,
        private basketSvc: BasketService
    ) {}

    async store(order: Order) {
        const result = await this.db.list('orders').push(order);
        this.basketSvc.clear();
        return result;
    }

    // HELPERS /////////////////////////////////////////////////////////////////////////////////////

    prepare(userId, shipping: Shipping, basketItems: BasketItem[]) {
        const items = this.prepareItems(basketItems);
        const timestamp = new Date().getTime();

        return { userId, timestamp, shipping, items } as Order;
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
