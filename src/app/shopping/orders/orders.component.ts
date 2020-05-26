import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
    orders$: Observable<Order[]>;

    constructor(private authSvc: AuthService, private orderSvc: OrderService) {}

    ngOnInit(): void {
        this.orders$ = this.authSvc.user$.pipe(
            map((user) => user.id),
            switchMap((id) => this.orderSvc.listByUser(id))
        );
    }
}
