import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Category } from '../models/category';
import { keyedList } from '../helpers';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private db: AngularFireDatabase) {}

    getAll() {
        return this.db
            .list<Category>('categories', (ref) => ref.orderByKey())
            .snapshotChanges()
            .pipe(map(keyedList));
    }
}
