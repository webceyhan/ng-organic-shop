import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ReplaySubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { DBService } from './db.service';
import { AuthService } from './auth.service';
import { OrderService } from './order.service';
import { Shipping } from 'shared/models/shipping';
import { Basket, BasketItem } from 'shared/models/basket';

@Injectable({
    providedIn: 'root',
})
export class BasketService extends DBService<Basket> {
    protected path = 'baskets';

    private id$ = new ReplaySubject<string>(1);

    constructor(
        db: AngularFireDatabase,
        private authSvc: AuthService,
        private orderSvc: OrderService
    ) {
        super(db);
        this.load();
    }

    get count$() {
        return this.listItems().pipe(map((items) => items.length));
    }

    get(id?: string): Observable<Basket> {
        if (id) return super.get(id);
        return this.id$.pipe(switchMap((id) => super.get(id)));
    }

    listItems(): Observable<BasketItem[]> {
        return this.get().pipe(
            map((basket) => basket.items || {}),
            map((items) => Object.values(items))
        );
    }

    async updateItem(item: BasketItem) {
        const basketId = await this.id$.pipe(take(1)).toPromise();
        const ref = this.getItemRef(item.id, basketId);

        // update or delete if quantity = 0
        item.quantity ? ref.update(item) : ref.remove();
    }

    async checkout(shipping: Shipping) {
        const user = await this.authSvc.user$.pipe(take(1)).toPromise();
        const basketItems = await this.listItems().pipe(take(1)).toPromise();

        // build order items
        const items = basketItems.map(
            ({ title, imageUrl, price, quantity }) => ({
                title,
                imageUrl,
                price,
                quantity,
                total: price * quantity,
            })
        );

        // save the order
        const order = await this.orderSvc.save({
            userId: user.id,
            shipping,
            items,
        });

        this.clear();
        return order;
    }

    async clear() {
        const id = await this.id$.pipe(take(1)).toPromise();
        this.objectRef(id).update({ items: {} });
    }

    // HELPERS /////////////////////////////////////////////////////////////////////////////////////

    private getItemRef(id: string, baskeId: string) {
        return this.db.object<BasketItem>(
            'baskets/' + baskeId + '/items/' + id
        );
    }

    private async load() {
        // try to load it from cache storage
        let id = localStorage.getItem('basketId');

        // create default if not exists
        if (!id) {
            id = (await this.save({ items: {} })).id;
            localStorage.setItem('basketId', id);
        }

        // emit basket id
        this.id$.next(id);
    }
}
