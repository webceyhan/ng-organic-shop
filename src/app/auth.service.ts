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
    ) {
        // bugfix: login.then() promise not working
        // listen to user on login to redirect to origin page
        this.user$.subscribe((user) => {
            if (user) {
                const url = localStorage.getItem('redirect') || '/';
                this.router.navigate([url]);
            }
        });
    }

    get user$() {
        return this.auth.authState;
    }

    login() {
        // workaround for query params getting lost
        // after google auth redirection done on the same page
        const { redirect } = this.route.snapshot.queryParams;
        localStorage.setItem('redirect', redirect || '/');

        this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.auth.signOut();
        this.router.navigate(['/']);
    }
}
