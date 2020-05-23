import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasketService } from '../shared/services/basket.service';
import { BasketItem } from '../shared/models/basket';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
    items$: Observable<BasketItem[]>;
    itemCount$: Observable<number>;
    total$: Observable<number>;

    constructor(private basketSvc: BasketService) {}

    ngOnInit(): void {
        this.itemCount$ = this.basketSvc.count$;
        this.items$ = this.basketSvc.getAll();
        this.total$ = this.basketSvc.total$;
    }

    onClear() {
        this.basketSvc.clear();
    }

    onIncreaseBasketItem(item) {
        this.basketSvc.increase(item);
    }

    onDecreaseBasketItem(item) {
        this.basketSvc.decrease(item);
    }
}
