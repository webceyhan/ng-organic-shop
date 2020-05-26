import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { auth } from 'firebase/app';

import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private auth: AngularFireAuth,
        private route: ActivatedRoute,
        private userSvc: UserService
    ) {}

    get state$() {
        return this.auth.authState;
    }

    get user$() {
        return this.state$.pipe(
            switchMap((state) => {
                if (!state) return of();
                return this.userSvc
                    .get(state.uid)
                    .pipe(map((user) => ({ ...user, id: state.uid })));
            }),
            map((user) => user as User)
        );
    }

    login() {
        // workaround for query params getting lost
        // after google auth redirection done on the same page
        const { redirect } = this.route.snapshot.queryParams;
        localStorage.setItem('redirect', redirect || '/');

        // bugfix: signInWithRedirect().then() promise not working
        this.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    }

    logout() {
        this.auth.signOut();
    }
}
