import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrderService } from 'shared/services/order.service';
import { UserService } from 'shared/services/user.service';
import { Order } from 'shared/models/order';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
    orders$: Observable<Order[]>;

    constructor(private userSvc: UserService, private orderSvc: OrderService) {}

    ngOnInit(): void {
        const users$ = this.userSvc.list();
        const orders$ = this.orderSvc.list();
        const all$ = combineLatest(users$, orders$);

        this.orders$ = all$.pipe(
            map(([users, orders]) => {
                // build user map (optimization)
                const usersMap = users.reduce(
                    (all, u) => ({ ...all, [u.id]: u }),
                    {}
                );

                return orders.map((order) => ({
                    ...order,
                    user: usersMap[order.userId],
                }));
            })
        );
    }
}
