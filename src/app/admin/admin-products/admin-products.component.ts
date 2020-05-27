import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
    query: string;
    products$: Observable<Product[]>;

    constructor(private productSvc: ProductService) {}

    ngOnInit(): void {
        this.products$ = this.productSvc.list();
    }

    onDelete(id: string) {
        if (confirm('Are you sure to delete this product?')) {
            this.productSvc.remove(id);
        }
    }

    onFilter(query: string) {
        this.query = query.toLowerCase();
    }
}
