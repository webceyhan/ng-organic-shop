import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    user: firebase.User;

    constructor(private auth: AngularFireAuth) {}

    ngOnInit() {
        this.auth.authState.subscribe((user) => (this.user = user));
    }

    onLogout() {
        this.auth.signOut();
    }
}
