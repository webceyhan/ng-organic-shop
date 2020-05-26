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

    get total() {
        return (this.items || []).reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
        );
    }
}
