import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Injectable({
    providedIn: 'root',
})
export class OrderResolver implements Resolve<Order> {
    constructor(private orderSvc: OrderService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Order | Observable<Order> | Promise<Order> {
        return this.orderSvc.get(route.params.id).pipe(take(1));
    }
}
