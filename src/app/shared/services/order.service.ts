import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BasketService } from './basket.service';
import { Order, OrderItem } from '../models/order';
import { BasketItem } from '../models/basket';
import { Shipping } from '../models/Shipping';
import { keyedList } from '../helpers';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(
        private db: AngularFireDatabase,
        private basketSvc: BasketService
    ) {}

    getById(id: string) {
        return this.db.object<Order>('orders/' + id).valueChanges();
    }

    get(): Observable<Order[]> {
        return this.db
            .list<Order>('orders')
            .snapshotChanges()
            .pipe(map(keyedList));
    }

    getByUser(userId: string): Observable<Order[]> {
        return this.db
            .list<Order>('orders', (ref) =>
                ref.orderByChild('userId').equalTo(userId)
            )
            .snapshotChanges()
            .pipe(map(keyedList));
    }

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
