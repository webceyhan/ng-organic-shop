import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
    { path: 'basket', component: BasketComponent },
    {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
    },

    // ADMIN
    {
        path: 'admin/products/new',
        component: ProductFormComponent,
    },
    {
        path: 'admin/products/:id',
        component: ProductFormComponent,
    },
    {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
