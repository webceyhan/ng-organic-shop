import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private db: AngularFireDatabase) {}

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
