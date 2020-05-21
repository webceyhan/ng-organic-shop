import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    user: User;

    constructor(private authSvc: AuthService) {}

    ngOnInit() {
        this.authSvc.user$.subscribe(user => this.user = user);
    }

    onLogout() {
        this.authSvc.logout();
    }
}
