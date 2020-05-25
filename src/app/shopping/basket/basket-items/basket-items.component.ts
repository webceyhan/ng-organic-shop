import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BasketItem } from 'shared/models/basket';

@Component({
    selector: 'app-basket-items',
    templateUrl: './basket-items.component.html',
    styleUrls: ['./basket-items.component.css'],
})
export class BasketItemsComponent {
    @Input()
    items: BasketItem[] = [];

    @Output()
    itemUpdate = new EventEmitter<BasketItem>();

    @Input()
    total = 0;

    onQuantityUpdate(item: BasketItem, quantity: number) {
        this.itemUpdate.emit({ ...item, quantity });
    }
}
