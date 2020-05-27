import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Category } from 'shared/models/category';
import { CategoryService } from 'shared/services/category.service';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
    category: Category = {} as any;
    categorySub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private categorySvc: CategoryService
    ) {}

    ngOnInit(): void {
        this.categorySub = this.route.data.subscribe((data) => {
            this.category = data.category || {};
        });
    }

    ngOnDestroy(): void {
        this.categorySub.unsubscribe();
    }

    async onSave() {
        await this.categorySvc.save(this.category);
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    async onDelete() {
        if (confirm('Are you sure to delete this product?')) {
            await this.categorySvc.remove(this.category.id);
            this.router.navigate(['../'], {relativeTo: this.route});
        }
    }

    onNameChange(name: string) {
        this.category.id = name.toLowerCase().replace(/ /g, '-');
    }
}
