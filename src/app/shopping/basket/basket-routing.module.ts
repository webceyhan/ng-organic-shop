import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketComponent } from './basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from 'shared/guards/auth.guard';
import { BasketFullGuard } from 'shared/guards/basket-full.guard';

const routes: Routes = [
    {
        path: 'basket/checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard, BasketFullGuard],
    },
    {
        path: 'basket',
        component: BasketComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BasketRoutingModule {}
