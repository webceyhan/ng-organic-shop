import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Model } from 'shared/models/model';

@Injectable({
    providedIn: 'root',
})
export class DBService<T extends Model> {
    protected path: string;

    constructor(protected db: AngularFireDatabase) {}

    // CRUD METHODS ////////////////////////////////////////////////////////////////////////////////

    list(query?: QueryFn): Observable<T[]> {
        return this.listRef(query)
            .snapshotChanges()
            .pipe(map((list) => (list ? list.map(this.mapKey) : [])));
    }

    get(id: string): Observable<T> {
        return this.objectRef(id)
            .snapshotChanges()
            .pipe(map((obj) => (obj ? this.mapKey(obj) : null)));
    }

    count(query?: QueryFn): Observable<number> {
        return this.listRef(query)
            .valueChanges()
            .pipe(map((list) => list?.length || 0));
    }

    async save(obj: T): Promise<T> {
        // prepare data
        const data = this.sanitize(obj);

        if (!obj.id) {
            // create
            data.id = (await this.listRef().push(data)).key;
        } else {
            // update
            await this.objectRef(obj.id).update(data);
        }

        return data;
    }

    async remove(id: string): Promise<void> {
        return this.objectRef(id).remove();
    }

    // HELPERS /////////////////////////////////////////////////////////////////////////////////////

    protected listRef(query?: QueryFn) {
        return this.db.list<T>(this.path, query);
    }

    protected objectRef(id: string) {
        return this.db.object<T>(this.path + '/' + id);
    }

    protected mapKey(obj: any): T {
        return {
            id: obj.payload.key,
            ...obj.payload.val(),
        };
    }

    protected sanitize(obj: T): T {
        const updatedAt = new Date().getTime();
        const data = { ...obj, updatedAt };

        // set create date if not exists yet
        if (!data.createdAt) {
            data.createdAt = updatedAt;
        }

        // remove id
        delete data.id;

        return data;
    }
}
