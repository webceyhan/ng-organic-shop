import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { OrderComponent } from 'shared/components/order/order.component';
import { AuthGuard } from 'shared/guards/auth.guard';
import { AdminGuard } from 'shared/guards/admin.guard';
import { ProductResolver } from 'shared/resolvers/product.resolver';
import { OrderResolver } from 'shared/resolvers/order.resolver';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard],
        children: [
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full',
            },
            {
                path: 'categories',
                component: AdminCategoriesComponent,
            },
            {
                path: 'products/new',
                component: ProductFormComponent,
            },
            {
                path: 'products/:id',
                component: ProductFormComponent,
                resolve: { product: ProductResolver },
            },
            {
                path: 'products',
                component: AdminProductsComponent,
            },
            {
                path: 'orders/:id',
                component: OrderComponent,
                resolve: { order: OrderResolver },
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
