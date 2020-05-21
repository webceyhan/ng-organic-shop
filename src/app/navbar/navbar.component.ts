import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    user$: Observable<User>;

    constructor(private authSvc: AuthService) {}

    ngOnInit() {
        this.user$ = this.authSvc.user$;
    }

    onLogout() {
        this.authSvc.logout();
    }
}
