import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';

@Injectable({
    providedIn: 'root',
})
export class ProductResolver implements Resolve<Product> {
    constructor(private productSvc: ProductService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Product | Observable<Product> | Promise<Product> {
        return this.productSvc.get(route.params.id).pipe(take(1));
    }
}
