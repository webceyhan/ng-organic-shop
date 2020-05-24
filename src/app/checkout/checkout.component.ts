import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasketService } from '../shared/services/basket.service';
import { BasketItem } from '../shared/models/basket';
import { Shipping } from '../shared/models/Shipping';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    items$: Observable<BasketItem[]>;
    total$: Observable<number>;

    constructor(private basketSvc: BasketService) {}

    ngOnInit(): void {
        this.items$ = this.basketSvc.getItems();
        this.total$ = this.basketSvc.total$;
    }

    onOrder(shipping: Shipping) {
        console.log(shipping);
    }
}
