import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    categories$: Observable<Category[]>;
    products$: Observable<Product[]>;

    constructor(private categorySvc: CategoryService, private productSvc:ProductService) {}

    ngOnInit(): void {
        this.categories$ = this.categorySvc.getAll();

        this.products$ = this.productSvc.getAll();
    }
}
