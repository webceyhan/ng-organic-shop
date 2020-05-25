import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
    order$: Observable<Order>;

    constructor(
        private route: ActivatedRoute,
        private orderSvc: OrderService,
        private userSvc: UserService
    ) {}

    ngOnInit(): void {
        this.order$ = this.route.params.pipe(
            map((params) => params.id),
            switchMap((id) => (id ? this.orderSvc.getById(id) : of())),
            switchMap((order: Order) => {
                if (!order) return of();

                // pre-calculate total sum of all items
                order.total = order.items.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                );

                return this.userSvc
                    .get(order.userId)
                    .pipe(map((user) => ({ ...order, user })));
            }),
            map((order) => order as Order)
        );
    }
}
