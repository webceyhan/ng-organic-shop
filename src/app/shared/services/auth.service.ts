import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private auth: AngularFireAuth,
        private route: ActivatedRoute,
        private router: Router,
        private userSvc: UserService
    ) {}

    get state$() {
        return this.auth.authState;
    }

    get user$() {
        return this.state$.pipe(
            switchMap((user) => (user ? this.userSvc.get(user.uid) : of(null)))
        );
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
