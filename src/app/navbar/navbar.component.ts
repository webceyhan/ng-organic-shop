import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    user$: Observable<firebase.User>;

    constructor(private authSvc: AuthService) {}

    ngOnInit() {
        this.user$ = this.authSvc.user$;
    }

    onLogout() {
        this.authSvc.logout();
    }
}
