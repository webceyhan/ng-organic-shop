import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Product } from 'shared/models/product';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
    categories$;
    product: Product = {} as any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productSvc: ProductService,
        private categorySvc: CategoryService
    ) {}

    ngOnInit(): void {
        this.categories$ = this.categorySvc.list();
        this.product = this.route.snapshot.data.product || {};
    }

    async onSave() {
        await this.productSvc.save(this.product);
        this.router.navigate(['/admin/products']);
    }

    async onDelete() {
        if (confirm('Are you sure to delete this product?')) {
            await this.productSvc.remove(this.product.id);
            this.router.navigate(['/admin/products']);
        }
    }
}
