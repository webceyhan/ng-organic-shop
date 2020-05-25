import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product';
import { Basket, BasketItem } from '../../models/basket';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
    @Input()
    product: Product;

    @Input()
    preview = false;

    @Input()
    basket: Basket;

    @Output()
    basketUpdate = new EventEmitter<BasketItem>();

    get basketItem() {
        return (this.basket?.items || {})[this.product.id];
    }

    onQuantityUpdate(quantity: number) {
        this.basketUpdate.emit({ ...this.product, quantity });
    }
}
