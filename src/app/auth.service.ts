import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private auth: AngularFireAuth,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    get user$() {
        return this.auth.authState;
    }

    login() {
        // workaround for query params getting lost
        // after google auth redirection done on the same page
        const { redirect } = this.route.snapshot.queryParams;
        localStorage.setItem('redirect', redirect || '/');

        // bugfix: signInWithRedirect().then() promise not working
        this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.auth.signOut();
        this.router.navigate(['/']);
    }
}
