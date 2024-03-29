import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasketService } from 'shared/services/basket.service';
import { BasketItem } from 'shared/models/basket';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
    items$: Observable<BasketItem[]>;
    count$: Observable<number>;

    constructor(private basketSvc: BasketService) {}

    ngOnInit(): void {
        this.items$ = this.basketSvc.listItems();
        this.count$ = this.basketSvc.count$;
    }

    onItemUpdate(item: BasketItem) {
        this.basketSvc.updateItem(item);
    }

    onClear() {
        this.basketSvc.clear();
    }
}
