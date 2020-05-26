import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UrlValidator } from './validators/url.validator';
import { MinValidator } from './validators/min.validator';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { QuanntityInputComponent } from './components/quanntity-input/quanntity-input.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { OrderComponent } from './components/order/order.component';
import { FilterPipe } from './pipes/filter.pipe';

const DECLARATIONS = [
    UrlValidator,
    MinValidator,
    ProductCardComponent,
    QuanntityInputComponent,
    OrderSummaryComponent,
    ShippingFormComponent,
    OrderComponent,
    FilterPipe,
];

@NgModule({
    declarations: DECLARATIONS,
    imports: [CommonModule, FormsModule, NgbModule],
    exports: [CommonModule, FormsModule, NgbModule, ...DECLARATIONS],
})
export class SharedModule {}
