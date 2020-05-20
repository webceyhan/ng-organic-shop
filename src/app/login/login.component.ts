import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    constructor(private auth: AngularFireAuth) {}

    onLogin() {
        this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
}
