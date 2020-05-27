import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    products$: Observable<Product[]>;

    constructor(private productSvc: ProductService) {}

    ngOnInit(): void {
        this.products$ = this.productSvc.list();
    }
}
