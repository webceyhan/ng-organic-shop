import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Product } from './models/product';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private db: AngularFireDatabase) {}

    get(uid: string) {
        return this.db.object<Product>('products/' + uid).valueChanges();
    }

    create(product: Product) {
        return this.db.list('products').push(product);
    }
}
