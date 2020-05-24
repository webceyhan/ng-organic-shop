import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';
import { BasketEmptyComponent } from './basket/basket-empty/basket-empty.component';

@NgModule({
    declarations: [
        AppComponent,
        BasketComponent,
        CheckoutComponent,
        OrderSuccessComponent,
        OrdersComponent,
        BasketEmptyComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        ProductsModule,
        AdminModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
