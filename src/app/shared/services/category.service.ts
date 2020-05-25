import { Injectable } from '@angular/core';

import { DBService } from './db.service';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root',
})
export class CategoryService extends DBService<Category> {
    path = 'categories';
}
