import { Model } from './model';

export interface Product extends Model {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}
