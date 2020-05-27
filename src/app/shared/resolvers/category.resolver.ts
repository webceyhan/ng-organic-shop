import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Category } from 'shared/models/category';
import { CategoryService } from 'shared/services/category.service';

@Injectable({
    providedIn: 'root',
})
export class CategoryResolver implements Resolve<Category> {
    constructor(private categorySvc: CategoryService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Category | Observable<Category> | Promise<Category> {
        return this.categorySvc.get(route.params.id).pipe(take(1));
    }
}
