import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { BasketService } from 'shared/services/basket.service';

@Injectable({
    providedIn: 'root',
})
export class BasketFullGuard implements CanActivate {
    constructor(private basketSvc: BasketService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.basketSvc.count$.pipe(map((count) => !!count));
    }
}
