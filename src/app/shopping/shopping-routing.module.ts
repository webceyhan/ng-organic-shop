import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from 'shared/components/order/order.component';
import { AuthGuard } from 'shared/guards/auth.guard';
import { OrderResolver } from 'shared/resolvers/order.resolver';

const routes: Routes = [
    {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'orders/:id',
        component: OrderComponent,
        canActivate: [AuthGuard],
        resolve: { order: OrderResolver },
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ShoppingRoutingModule {}
