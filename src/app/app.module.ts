import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';

@NgModule({
    declarations: [
        AppComponent,
        BasketComponent,
        CheckoutComponent,
        OrderSuccessComponent,
        OrdersComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        ProductFormComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        ProductsModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
