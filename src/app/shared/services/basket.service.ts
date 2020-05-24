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

        // automatic write-out to cachte
        this.basket$.subscribe((basket) => {
            localStorage.setItem('basket', JSON.stringify(basket));
        });
    }

    get count$() {
        return this.getAll().pipe(map((items) => items.length));
    }

    get total$() {
        return this.getAll().pipe(
            map((items) =>
                items.map(({ price, quantity }) => price * quantity)
            ),
            map((prices) => prices.reduce((sum, price) => sum + price, 0))
        );
    }

    getAll() {
        return this.basket$
            .asObservable()
            .pipe(map((basket) => Object.values(basket)));
    }

    get(id: string) {
        return this.basket$.pipe(map((basket) => basket[id]));
    }

    addItem(product: Product) {
        const { key } = product;
        const next = this.basket$.value;
        const item = next[key] || { ...product, quantity: 0 };

        // update
        item.quantity += 1;

        this.basket$.next({ ...next, [key]: item });
    }

    removeItem(product: Product) {
        const { key } = product;
        const next = this.basket$.value;
        const item = next[key];

        // update
        item.quantity -= 1;

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
