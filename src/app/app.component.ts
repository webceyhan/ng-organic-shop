import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        private authSvc: AuthService,
        private userSvc: UserService
    ) {}

    ngOnInit(): void {
        this.authSvc.state$.subscribe((state) => {
            if (state) {
                // save logged-in user to db
                this.userSvc.save(state);

                // listen to user on login to redirect to origin page
                const url = localStorage.getItem('redirect') || '/';
                this.router.navigate([url]);
            }
        });
    }
}
