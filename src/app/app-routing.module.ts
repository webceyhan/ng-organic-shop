import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
