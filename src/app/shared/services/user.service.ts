import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { keyedList } from '../helpers';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private db: AngularFireDatabase) {}

    getAll() {
        return this.db
            .list<User>('users')
            .snapshotChanges()
            .pipe(
                map(keyedList),
                map((users) => users as User[])
            );
    }

    get(uid: string) {
        return this.db.object<User>('users/' + uid).valueChanges();
    }

    save(user: firebase.User) {
        this.db.object('users/' + user.uid).update({
            name: user.displayName,
            email: user.email,
        });
    }
}
