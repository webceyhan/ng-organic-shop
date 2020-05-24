import { Component, Input } from '@angular/core';

import { BasketItem } from '../../models/basket';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
    @Input()
    items: BasketItem[] = [];

    @Input()
    total = 0;
}
