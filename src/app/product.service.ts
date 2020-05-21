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

    get(uid: string) {
        return this.db.object<Product>('products/' + uid).valueChanges();
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
}
