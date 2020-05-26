import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';

import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
    constructor(
        private router: Router,
        private authSvc: AuthService,
        private userSvc: UserService
    ) {}

    ngOnInit(): void {
        this.authSvc.state$.subscribe((state: User) => {
            if (state) {
                // save logged-in user to db
                this.userSvc.save({
                    id: state.uid,
                    name: state.displayName,
                    email: state.email,
                    // isAdmin: false,
                } as any);

                // redirect to origin page on login
                // if only redirect url exists
                const url = localStorage.getItem('redirect');
                url && localStorage.removeItem('redirect');
                url && this.router.navigate([url]);
            }
        });
    }
}
