import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'shared/models/user';
import { AuthService } from 'shared/services/auth.service';
import { BasketService } from 'shared/services/basket.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    user: User;
    basketCount: number;

    constructor(
        private router: Router,
        private authSvc: AuthService,
        private basketSvc: BasketService
    ) { }

    ngOnInit() {
        this.authSvc.user$.subscribe((user) => (this.user = user));
        this.basketSvc.count$.subscribe((count) => (this.basketCount = count));
    }

    onLogout() {
        this.authSvc.logout();
        this.router.navigate(['/']);
    }
}
