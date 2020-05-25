import { NgModule } from '@angular/core';

import { SharedModule } from 'shared/shared.module';
import { BasketModule } from './basket/basket.module';
import { ProductsModule } from './products/products.module';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
    declarations: [CheckoutComponent, OrdersComponent],
    imports: [
        SharedModule,
        BasketModule,
        ProductsModule,
        ShoppingRoutingModule,
    ],
})
export class ShoppingModule {}
