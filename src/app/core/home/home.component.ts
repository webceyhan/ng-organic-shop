import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/category';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    categories$: Observable<Category[]>;

    constructor(private categorySvc: CategoryService) {}

    ngOnInit(): void {
        this.categories$ = this.categorySvc.getAll();
    }
}
