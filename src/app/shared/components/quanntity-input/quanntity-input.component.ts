import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-quanntity-input',
    templateUrl: './quanntity-input.component.html',
    styleUrls: ['./quanntity-input.component.css'],
})
export class QuanntityInputComponent {
    @Input()
    value = 0;

    @Output()
    change = new EventEmitter<number>();

    onChange(value: number) {
        this.change.emit((this.value || 0) + value);
    }
}
