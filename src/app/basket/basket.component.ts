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
    count$: Observable<number>;
    total$: Observable<number>;

    constructor(private basketSvc: BasketService) {}

    ngOnInit(): void {
        this.items$ = this.basketSvc.getItems();
        this.count$ = this.basketSvc.count$;
        this.total$ = this.basketSvc.total$;
    }

    onClear() {
        this.basketSvc.clear();
    }

    onIncreaseBasketItem(item) {
        this.basketSvc.addItem(item);
    }

    onDecreaseBasketItem(item) {
        this.basketSvc.removeItem(item);
    }
}
