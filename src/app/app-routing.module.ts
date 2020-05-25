import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from 'shared/components/order/order.component';
import { AuthGuard } from 'shared/guards/auth.guard';

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
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
