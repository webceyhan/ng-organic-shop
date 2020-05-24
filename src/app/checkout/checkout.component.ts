import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { BasketService } from '../shared/services/basket.service';
import { BasketItem } from '../shared/models/basket';
import { Shipping } from '../shared/models/Shipping';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    items$: Observable<BasketItem[]>;
    total$: Observable<number>;

    constructor(
        private router:Router,
        private authSvc: AuthService,
        private orderSvc: OrderService,
        private basketSvc: BasketService
    ) {}

    ngOnInit(): void {
        this.items$ = this.basketSvc.getItems();
        this.total$ = this.basketSvc.total$;
    }

    async onOrder(shipping: Shipping) {
        const { uid } = await this.authSvc.state$.pipe(take(1)).toPromise();
        const items = await this.items$.pipe(take(1)).toPromise();
        const order = this.orderSvc.prepare(uid, shipping, items);
        const result = await this.orderSvc.store(order);
        
        this.router.navigate(['/orders', result.key]);
    }
}
