import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from 'shared/services/category.service';
import { Category } from 'shared/models/category';

@Component({
    selector: 'app-admin-categories',
    templateUrl: './admin-categories.component.html',
    styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
    categories$: Observable<Category[]>;

    constructor(private categorySvc: CategoryService) {}

    ngOnInit(): void {
        this.categories$ = this.categorySvc.list();
    }
}
