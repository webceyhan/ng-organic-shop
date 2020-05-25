import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';
import { map } from 'rxjs/operators';

type OrderWithUser = Order & { user: User };

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
    orders$: Observable<OrderWithUser[]>;

    constructor(private userSvc: UserService, private orderSvc: OrderService) {}

    ngOnInit(): void {
        const users$ = this.userSvc.getAll();
        const orders$ = this.orderSvc.get();
        const all$ = combineLatest(users$, orders$);

        this.orders$ = all$.pipe(
            map(([users, orders]) => {
                // build user map (optimization)
                const usersMap = users.reduce(
                    (all, u) => ({ ...all, [u.key]: u }),
                    {}
                );

                return orders.map(
                    (order) =>
                        ({
                            ...order,
                            user: usersMap[order.userId],
                        } as OrderWithUser)
                );
            })
        );
    }
}
