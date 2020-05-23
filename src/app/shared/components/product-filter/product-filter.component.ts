import { Component, Input } from '@angular/core';

import { Category } from './node_modules/src/app/shared/models/category';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
    @Input()
    categories: Category[];
}
