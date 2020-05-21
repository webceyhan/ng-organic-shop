import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'src/app/category.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
    categories$;

    constructor(
        private productSvc: ProductService,
        private categorySvc: CategoryService
    ) {}

    ngOnInit(): void {
        this.categories$ = this.categorySvc.getList();
    }

    onSave(product) {
        this.productSvc.create(product);
    }
}
