import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Basket, BasketItem } from '../models/basket';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root',
})
export class BasketService {
    private basket$ = new BehaviorSubject<Basket>(null);

    constructor() {
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
        return this.basket$.asObservable();
    }

    getItems() {
        return this.get().pipe(
            map((basket) => basket.items),
            map((items) => Object.values(items))
        );
    }

    updateItem(item: BasketItem) {
        const { key } = item;
        const next = this.basket$.value;

        // update
        next.items[key] = { ...item };

        // delete if quantity = 0
        if (!item.quantity) {
            delete next.items[key];
        }

        this.basket$.next({ ...next });
    }

    addItem(product: Product) {
        const { key } = product;
        const { items } = this.basket$.value;
        const item = items[key] || { ...product, quantity: 0 };

        // update
        item.quantity += 1;

        this.basket$.next({
            ...this.basket$.value,
            items: { ...items, [key]: item },
        });
    }

    removeItem(product: Product) {
        const { key } = product;
        const { items } = this.basket$.value;

        // update (or delete if 0)
        items[key].quantity -= 1;
        if (!items[key].quantity) delete items[key];

        this.basket$.next({
            ...this.basket$.value,
            items: { ...items },
        });
    }

    clear() {
        this.basket$.next({ ...this.basket$.value, items: {} });
    }

    // HELPERS /////////////////////////////////////////////////////////////////////////////////////

    private load() {
        // try to load it from cache storage
        const basket = localStorage.getItem('basket');
        this.basket$.next(basket ? JSON.parse(basket) : this.create());

        // auto-write to cache on every update
        this.basket$.subscribe((basket) => {
            localStorage.setItem('basket', JSON.stringify(basket));
        });
    }

    private create() {
        return { items: {}, timestamp: new Date().getTime() };
    }
}
