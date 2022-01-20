import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { auth } from 'firebase/compat/app';
import { of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AngularFireAuth,
        private userSvc: UserService
    ) {
        this.state$.subscribe(this.listen.bind(this));
    }

    get state$(): Observable<firebase.User> {
        return this.auth.authState;
    }

    get user$(): Observable<User> {
        return this.state$.pipe(
            map((state) => state?.uid),
            switchMap((id) => (id ? this.userSvc.get(id) : of(null)))
        );
    }

    async login(provider?: string) {
        // workaround for query params getting lost
        // after google auth redirection done on the same page
        const { redirect } = this.route.snapshot.queryParams;
        localStorage.setItem('redirect', redirect || '/');

        switch (provider) {
            case 'facebook':
                this.auth.signInWithRedirect(new auth.FacebookAuthProvider());
                break;

            default:
                // default provider = google
                // bugfix: signInWithRedirect().then() promise not working
                this.auth.signInWithRedirect(new auth.GoogleAuthProvider());
                break;
        }
    }

    async logout() {
        await this.auth.signOut();
        this.router.navigate(['/']);
    }

    // HELPERS /////////////////////////////////////////////////////////////////////////////////////

    private listen(state: firebase.User) {
        // skip if not authenticated
        if (!state) return;

        // save authenticated user
        this.userSvc.save({
            id: state.uid,
            name: state.displayName,
            email: state.email,
            photoUrl: state.photoURL,
            // isAdmin: false,
        } as any);

        // redirect after login if exists
        const url = localStorage.getItem('redirect');
        url && localStorage.removeItem('redirect');
        url && this.router.navigate([url]);
    }
}
