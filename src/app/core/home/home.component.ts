import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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