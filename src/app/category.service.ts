import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Category } from './models/category';
import { map } from 'rxjs/operators';
import { keyedList } from './helpers';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private db: AngularFireDatabase) {}

    getList() {
        return this.db
            .list<Category>('categories')
            .snapshotChanges()
            .pipe(map(keyedList));
    }
}
