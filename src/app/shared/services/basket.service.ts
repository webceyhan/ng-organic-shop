import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ReplaySubject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Basket, BasketItem } from '../models/basket';

@Injectable({
    providedIn: 'root',
})
export class BasketService {
    private id$ = new ReplaySubject<string>(1);

    constructor(private db: AngularFireDatabase) {
        this.load();
    }

    get count$() {
        return this.getItems().pipe(map((items) => items.length));
    }

    get total$() {
        return this.getItems().pipe(
            map((items) => items.map((item) => item.price * item.quantity)),
            map((prices) => prices.reduce((sum, price) => sum + price, 0))
        );
    }

    get() {
        return this.id$.pipe(
            map((id) => this.db.object<Basket>('baskets/' + id)),
            switchMap((ref) => ref.valueChanges())
        );
    }

    getItems() {
        return this.get().pipe(
            map((basket) => basket.items || {}),
            map((items) => Object.values(items))
        );
    }

    async updateItem(item: BasketItem) {
        const itemId = item.key;
        const id = await this.id$.pipe(take(1)).toPromise();
        const ref = this.db.object('baskets/' + id + '/items/' + itemId);

        // update or delete if quantity = 0
        item.quantity ? ref.update(item) : ref.remove();
    }

    async clear() {
        const id = await this.id$.pipe(take(1)).toPromise();
        const ref = this.db.object('baskets/' + id);

        ref.update({ items: {} });
    }

    // HELPERS /////////////////////////////////////////////////////////////////////////////////////

    private async load() {
        // try to load it from cache storage
        const id = localStorage.getItem('basketId');

        // use cached or create new basket
        this.id$.next(id || (await this.create()));
    }

    private async create() {
        const basket = { items: {}, timestamp: new Date().getTime() };
        const result = await this.db.list('baskets').push(basket);

        // cache
        localStorage.setItem('basketId', result.key);

        return result.key;
    }
}
