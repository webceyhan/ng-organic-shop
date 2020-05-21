import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from '../../product.service';
import { Product } from 'src/app/models/product';

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
            .getAll()
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
