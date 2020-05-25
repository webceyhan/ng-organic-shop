import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    sub: Subscription;
    products: Product[] = [];
    filteredProducts: Product[] = [];

    constructor(private productSvc: ProductService) {}

    ngOnInit(): void {
        this.sub = this.productSvc
            .list()
            .subscribe(
                (products) => (this.filteredProducts = this.products = products)
            );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onDelete(id: string) {
        if (confirm('Are you sure to delete this product?')) {
            this.productSvc.remove(id);
        }
        // prevent default href event
        return false;
    }

    onFilter(query: string) {
        this.filteredProducts = query
            ? this.products.filter((p) =>
                  p.title.toLowerCase().includes(query.toLowerCase())
              )
            : this.products;
    }
}
