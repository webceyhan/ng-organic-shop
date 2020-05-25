import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { User } from 'shared/models/user';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
    user: User;
    orders$: Observable<Order[]>;

    constructor(private authSvc: AuthService, private orderSvc: OrderService) {}

    ngOnInit(): void {
        this.orders$ = this.authSvc.user$.pipe(
            tap((user) => (this.user = user)),
            switchMap((user) =>
                user ? this.orderSvc.getByUser(user.key) : of()
            ),
            map((orders) => orders as Order[])
        );
    }
}
