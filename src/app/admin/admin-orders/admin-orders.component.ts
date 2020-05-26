import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrderService } from 'shared/services/order.service';
import { UserService } from 'shared/services/user.service';
import { Order } from 'shared/models/order';
import { User } from 'shared/models/user';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
    orders$: Observable<Order[]>;
    userMap$: Observable<{ [key: string]: User }>;

    constructor(private userSvc: UserService, private orderSvc: OrderService) {}

    ngOnInit(): void {
        this.orders$ = this.orderSvc.list();
        this.userMap$ = this.userSvc.list().pipe(map(this.buildMap));
    }

    private buildMap(users) {
        return users.reduce((all, u) => ({ ...all, [u.id]: u }), {});
    }

    onRemove(id: string) {
        this.orderSvc.remove(id);
    }
}
