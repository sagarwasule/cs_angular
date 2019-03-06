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

  public addOrders(order: Order) {

    const index = this.orderList.findIndex(x => x.id === order.id);

    if (index > -1) {
      this.orderList[index] = order;
    } else {
      order.id = this.orderList.length + 1;
      order.orderDate = new Date();

      this.orderList.push(order);
    }
  }

  public getOrderById(id: number): Order {
    return this.orderList.find(x => x.id === id);
  }

}
