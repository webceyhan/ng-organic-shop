import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductFormComponent } from './product-form/product-form.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { OrderComponent } from 'shared/components/order/order.component';
import { AuthGuard } from 'shared/guards/auth.guard';
import { AdminGuard } from 'shared/guards/admin.guard';

const routes: Routes = [
    {
        path: 'admin',
        canActivate: [AuthGuard, AdminGuard],
        children: [
            {
                path: 'products/new',
                component: ProductFormComponent,
            },
            {
                path: 'products/:id',
                component: ProductFormComponent,
            },
            {
                path: 'products',
                component: AdminProductsComponent,
            },
            {
                path: 'orders/:id',
                component: OrderComponent,
            },
            {
                path: 'orders',
                component: AdminOrdersComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
