import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';
import { BasketItemsComponent } from './basket-items/basket-items.component';
import { BasketEmptyComponent } from './basket-empty/basket-empty.component';

@NgModule({
    declarations: [BasketComponent, BasketItemsComponent, BasketEmptyComponent],
    imports: [SharedModule, BasketRoutingModule],
})
export class BasketModule {}
