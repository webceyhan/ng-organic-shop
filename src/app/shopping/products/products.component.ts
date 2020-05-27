import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BasketService } from 'shared/services/basket.service';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Category } from 'shared/models/category';
import { Product } from 'shared/models/product';
import { Basket, BasketItem } from 'shared/models/basket';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    basket$: Observable<Basket>;
    products$: Observable<Product[]>;
    categories$: Observable<Category[]>;

    constructor(
        private route: ActivatedRoute,
        private basketSvc: BasketService,
        private productSvc: ProductService,
        private categorySvc: CategoryService
    ) {}

    ngOnInit(): void {
        const categories$ = this.categorySvc.list();
        const products$ = this.productSvc.list().pipe(shareReplay(1));
        const categoryId$ = this.route.queryParams.pipe(map((q) => q.category));

        // build product count matrix by category
        const productCountMap$ = products$.pipe(
            map((products) =>
                products.reduce((m, p) => {
                    const count = m[p.category] || 0;
                    return { ...m, [p.category]: count + 1 };
                }, {})
            )
        );

        // get categories with product count join
        this.categories$ = combineLatest(categories$, productCountMap$).pipe(
            map(([categories, productCountMap]) =>
                categories.map((cat) => ({
                    ...cat,
                    productCount: productCountMap[cat.id] || 0,
                }))
            )
        );

        // get products combined with optional query param
        this.products$ = combineLatest(products$, categoryId$).pipe(
            map(([products, id]) =>
                id ? products.filter((p) => p.category === id) : products
            )
        );

        this.basket$ = this.basketSvc.get();
    }

    onBasketUpdate(item: BasketItem) {
        this.basketSvc.updateItem(item);
    }
}
