import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Product } from '../models/product';
import { keyedList } from '../helpers';

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
                map(
                    (product) =>
                        ({
                            key: product.payload.key,
                            ...product.payload.val(),
                        } as Product)
                )
            );
    }

    getAll(query?: QueryFn) {
        if (!query) { // default query
            query = (ref) => ref.orderByKey();
        }

        return this.db
            .list<Product>('products', query)
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

    remove(id: string) {
        return this.db.object<Product>('products/' + id).remove();
    }
}
