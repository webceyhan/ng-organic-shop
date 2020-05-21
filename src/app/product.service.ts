import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Product } from './models/product';
import { keyedList } from './helpers';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private db: AngularFireDatabase) {}

    get(id: string) {
        return this.db
            .object<Product>('products/' + id)
            .snapshotChanges()
            .pipe(
                map((p) => ({
                    key: p.payload.key,
                    ...p.payload.val(),
                }) as Product)
            );
    }

    getAll() {
        return this.db
            .list<Product>('products', (ref) => ref.orderByKey())
            .snapshotChanges()
            .pipe(map(keyedList));
    }

    create(product: Product) {
        return this.db.list('products').push(product);
    }

    update(product: Product) {
        const id = product.key;
        delete product.key;
        return this.db.object<Product>('products/' + id).update(product);
    }
}
