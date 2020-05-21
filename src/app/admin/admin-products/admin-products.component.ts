import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../product.service';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
    products$;

    constructor(private productSvc: ProductService) {}

    ngOnInit(): void {
        this.products$ = this.productSvc.getAll();
    }

    onDelete(id: string) {
        if (confirm('Are you sure to delete this product?')) {
            this.productSvc.remove(id);
        }
        // prevent default href event
        return false;
    }
}
