import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { OrderStore } from '../store/order.store';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderList: Order[];

  constructor() {
    this.orderList = OrderStore;
   }

  public getOrders(): Order[] {
    return this.orderList;
  }

  addOrders(order: Order) {

    order.id = this.orderList.length + 1;
    order.orderDate = new Date();

    this.orderList.push(order);
  }

}
