import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BasketService } from 'shared/services/basket.service';
import { BasketItem } from 'shared/models/basket';
import { Shipping } from 'shared/models/shipping';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    items$: Observable<BasketItem[]>;

    constructor(private router: Router, private basketSvc: BasketService) {}

    ngOnInit(): void {
        this.items$ = this.basketSvc.listItems();
    }

    async onOrder(shipping: Shipping) {
        const order = await this.basketSvc.checkout(shipping);
        this.router.navigate(['/orders', order.id]);
    }
}
