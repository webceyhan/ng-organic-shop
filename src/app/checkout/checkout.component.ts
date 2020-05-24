import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasketService } from '../shared/services/basket.service';
import { BasketItem } from '../shared/models/basket';
import { Shipping } from '../shared/models/Shipping';
import { OrderService } from '../shared/services/order.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    items$: Observable<BasketItem[]>;
    total$: Observable<number>;

    constructor(
        private orderSvc: OrderService,
        private basketSvc: BasketService
    ) {}

    ngOnInit(): void {
        this.items$ = this.basketSvc.getItems();
        this.total$ = this.basketSvc.total$;
    }

    async onOrder(shipping: Shipping) {
        const items = await this.items$.pipe(take(1)).toPromise();
        const order = this.orderSvc.prepare(shipping, items);
        this.orderSvc.store(order);
    }
}
