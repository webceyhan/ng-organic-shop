import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

const DECLARATIONS = [
    ProductsComponent,
    ProductCardComponent,
    ProductFilterComponent,
];

@NgModule({
    declarations: DECLARATIONS,
    imports: [SharedModule, ProductsRoutingModule],
    exports: [ProductCardComponent]
})
export class ProductsModule {}
