import { Injectable } from '@angular/core';

import { DBService } from './db.service';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root',
})
export class OrderService extends DBService<Order> {
    protected path = 'orders';

    listByUser(userId: string) {
        return this.list((ref) => ref.orderByChild('userId').equalTo(userId));
    }
}
