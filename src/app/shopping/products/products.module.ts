import { NgModule } from '@angular/core';

import { SharedModule } from 'shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@NgModule({
    declarations: [ProductsComponent, ProductFilterComponent],
    imports: [SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
