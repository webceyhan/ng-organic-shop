import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/category';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    // products$: Observable<Product[]>;

    categories$: Observable<Category[]>;
    filteredProducts$: Observable<Product[]>;
    products: Product[] = [];

    constructor(
        private route: ActivatedRoute,
        private productSvc: ProductService,
        private categorySvc: CategoryService
    ) {}

    ngOnInit(): void {
        this.categories$ = this.categorySvc.getAll();

        //
        // server-side filtering approach
        //

        // this.products$ = this.route.queryParams.pipe(
        //     map((params) => params.category),
        //     switchMap((category) => {
        //         return this.productSvc.getAll((ref) =>
        //             category
        //                 ? ref.orderByChild('category').equalTo(category)
        //                 : ref
        //         );
        //     })
        // );

        //
        // client-side filtering
        //
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
}
