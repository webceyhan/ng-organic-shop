import { Model } from './model';

export interface Shipping extends Model {
    name: string;
    address: string;
    city: string;
}
