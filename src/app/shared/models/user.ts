import { Model } from './model';

export interface User extends Model {
    name: string;
    email: string;
    isAdmin: boolean;
    photoUrl: string;
}
