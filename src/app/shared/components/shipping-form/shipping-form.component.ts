import { Component, Output, EventEmitter } from '@angular/core';

import { Shipping } from '../../models/Shipping';

@Component({
    selector: 'app-shipping-form',
    templateUrl: './shipping-form.component.html',
    styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent {
    @Output()
    save = new EventEmitter<Shipping>();

    onSubmit(value) {
        this.save.emit(value);
    }
}
