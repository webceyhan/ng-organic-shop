import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    // products$: Observable<Product[]>;

    products: Product[] = [];
    filteredProducts$: Observable<Product[]>;

    constructor(
        private route: ActivatedRoute,
        private productSvc: ProductService
    ) {}

    ngOnInit(): void {
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
