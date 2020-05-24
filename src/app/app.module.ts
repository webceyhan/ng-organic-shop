import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { BasketModule } from './basket/basket.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';

@NgModule({
    declarations: [
        AppComponent,
        CheckoutComponent,
        OrdersComponent,
        OrderComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        ProductsModule,
        BasketModule,
        AdminModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
