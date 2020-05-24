import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import { BasketService } from '../shared/services/basket.service';
import { ProductService } from '../shared/services/product.service';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/category';
import { Product } from '../shared/models/product';
import { Basket, BasketItem } from '../shared/models/basket';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    basket$: Observable<Basket>;
    products: Product[] = [];
    categories$: Observable<Category[]>;
    filteredProducts$: Observable<Product[]>;

    constructor(
        private route: ActivatedRoute,
        private basketSvc: BasketService,
        private productSvc: ProductService,
        private categorySvc: CategoryService
    ) {}

    ngOnInit(): void {
        this.basket$ = this.basketSvc.get();
        this.categories$ = this.categorySvc.getAll();

        this.filteredProducts$ = this.productSvc.getAll().pipe(
            tap((all) => (this.products = all)),
            switchMap(() => this.route.queryParams),
            map((params) => params.category),
            map((category) =>
                category
                    ? this.products.filter((p) => p.category === category)
                    : this.products
            )
        );
    }

    onBasketUpdate(item: BasketItem) {
        if (item.quantity > 0) this.basketSvc.addItem(item);
        else this.basketSvc.removeItem(item);
    }
}
