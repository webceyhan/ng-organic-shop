import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
    products$: Observable<Product[]>;
    filter$ = new BehaviorSubject<string>('');

    constructor(private productSvc: ProductService) {}

    ngOnInit(): void {
        const products$ = this.productSvc.list().pipe(shareReplay(1));
        const filter$ = this.filter$.pipe(map((q) => q.toLowerCase()));

        this.products$ = combineLatest(products$, filter$).pipe(
            map(([list, query]) =>
                list.filter((p) => p.title.toLowerCase().includes(query))
            )
        );
    }

    onDelete(id: string) {
        if (confirm('Are you sure to delete this product?')) {
            this.productSvc.remove(id);
        }
        // prevent default href event
        return false;
    }

    onFilter(query: string) {
        this.filter$.next(query);
    }
}
