import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/shared/models/product';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
    @Input()
    product: Product;

    @Input()
    preview = false;

    @Output()
    addToBasket = new EventEmitter<Product>();

    constructor() {}

    ngOnInit(): void {}

    onAddToBasket() {
        this.addToBasket.emit(this.product);
    }
}
