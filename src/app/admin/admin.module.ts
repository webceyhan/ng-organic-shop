import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
    declarations: [
        AdminProductsComponent,
        AdminOrdersComponent,
        ProductFormComponent,
    ],
    imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}