import { Injectable } from '@angular/core';

import { DBService } from './db.service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService extends DBService<User> {
    protected path = 'users';
}
