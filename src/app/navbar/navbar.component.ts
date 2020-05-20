import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    user$: Observable< firebase.User>;

    constructor(private auth: AngularFireAuth) {}

    ngOnInit() {
        this.user$ = this.auth.authState;
    }

    onLogout() {
        this.auth.signOut();
    }
}
