import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private auth: AngularFireAuth) {}

    get user$() {
        return this.auth.authState;
    }

    login() {
        this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.auth.signOut();
    }
}
