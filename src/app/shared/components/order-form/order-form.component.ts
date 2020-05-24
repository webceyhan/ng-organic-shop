import { Component, Output, EventEmitter } from '@angular/core';

import { Shipping } from '../../models/Shipping';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
    @Output()
    save = new EventEmitter<Shipping>();

    onSubmit(value) {
        this.save.emit(value);
    }
}
