import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from 'src/app/shared/models/product';
import { BasketService } from 'src/app/shared/services/basket.service';

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

    basketQuantity$: Observable<number>;

    constructor(private basketSvc: BasketService) {}

    ngOnInit(): void {
        // initialize basket item quantity or default to 0
        this.basketQuantity$ = this.basketSvc
            .get(this.product.key)
            .pipe(map((item) => item?.quantity || 0));
    }

    onIncreaseBasketItem() {
        this.basketSvc.increase(this.product);
    }

    onDecreaseBasketItem() {
        this.basketSvc.decrease(this.product);
    }
}
