import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Basket } from '../models/basket';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root',
})
export class BasketService {
    private basket$ = new BehaviorSubject<Basket>({});

    constructor() {
        // try to load it from local storage
        const basket = localStorage.getItem('basket');
        this.basket$.next(basket ? JSON.parse(basket) : {});
    }

    get items$() {
        return this.basket$
            .asObservable()
            .pipe(map((basket) => Object.values(basket)));
    }

    get count$() {
        return this.items$.pipe(map((items) => items.length));
    }

    get total$() {
        return this.items$.pipe(
            map((items) => items.map((item) => item.price)),
            map((prices) => prices.reduce((sum, price) => sum + price, 0))
        );
    }

    getAll() {
        return this.items$;
    }

    get(id: string) {
        return this.basket$.pipe(map((basket) => basket[id]));
    }

    increase(product: Product) {
        const { key, price } = product;
        const next = this.basket$.value;
        const item = next[key] || { product, price, quantity: 0 };

        // update
        item.quantity += 1;
        item.price = price * item.quantity;

        this.basket$.next({ ...next, [key]: item });
    }

    decrease(product: Product) {
        const { key, price } = product;
        const next = this.basket$.value;
        const item = next[key];

        // update
        item.quantity -= 1;
        item.price = price * item.quantity;

        if (!item.quantity) {
            delete next[key];
            this.basket$.next({ ...next });
        } else {
            this.basket$.next({ ...next, [key]: item });
        }
    }

    clear() {
        this.basket$.next({});
    }
}
