import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
    categories$: Observable<Category[]>;

    constructor(private categorySvc: CategoryService) {}

    ngOnInit(): void {
        this.categories$ = this.categorySvc.getAll();
    }
}
