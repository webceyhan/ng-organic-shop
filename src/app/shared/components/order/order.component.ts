import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { OrderService } from 'shared/services/order.service';
import { UserService } from 'shared/services/user.service';
import { Order } from 'shared/models/order';
import { User } from 'shared/models/user';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
    user$: Observable<User>;
    order$: Observable<Order>;

    constructor(private route: ActivatedRoute, private userSvc: UserService) {}

    ngOnInit(): void {
        this.order$ = this.route.data.pipe(map((data) => data.order));

        this.user$ = this.order$.pipe(
            map((order) => order?.userId),
            switchMap((id) => (id ? this.userSvc.get(id) : of(null)))
        );
    }
}
