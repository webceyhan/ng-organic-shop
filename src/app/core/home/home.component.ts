import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    categories$: Observable<Category[]>;
    products$: Observable<Product[]>;

    constructor(
        private route: ActivatedRoute,
        private categorySvc: CategoryService,
        private productSvc: ProductService
    ) {}

    ngOnInit(): void {
        this.categories$ = this.categorySvc.getAll();

        this.products$ = this.route.queryParams.pipe(
            map((params) => params.category),
            switchMap((category) => {
                return this.productSvc.getAll((ref) =>
                    category
                        ? ref.orderByChild('category').equalTo(category)
                        : ref
                );
            })
        );
    }
}
