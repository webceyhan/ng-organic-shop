import { Injectable } from '@angular/core';

import { DBService } from './db.service';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root',
})
export class ProductService extends DBService<Product> {
    path = 'products';
}
