import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/models/product';

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
        const { id } = this.route.snapshot.params;
        if (id) {
            this.productSvc
                .get(id)
                .pipe(take(1))
                .subscribe((p) => (this.product = p));
        }

        this.categories$ = this.categorySvc.getList();
    }

    onSave() {
        this.product.key
            ? this.productSvc.update(this.product)
            : this.productSvc.create(this.product);

        this.router.navigate(['/admin/products']);
    }

    onDelete() {
        if (confirm('Are you sure to delete this product?')) {
            this.productSvc.remove(this.product.key);
            this.router.navigate(['/admin/products']);
        }
    }
}
