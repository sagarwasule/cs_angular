import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { SortEvent, SortableDirective, compare } from 'src/app/directives/sortable.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  ordersTodelete: number[] = [];

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }

  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.orders = this.orders;
    } else {
      this.orders = this.orders.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  onAddOrder() {
    this.router.navigate(['./addorder']);
  }

  markForDelete(e, id) {
    const index = this.ordersTodelete.findIndex(x => x === id);
    if (e.target.checked && index === -1) {
      this.ordersTodelete.push(id);
    } else if (index !== -1) {
      this.ordersTodelete.splice(index, 1);
    }
  }

  onDeleteOrders() {
    this.ordersTodelete.forEach(element => {
      const index = this.orders.findIndex(x => x.id === element);
      this.orders.splice(index, 1);
    });

    this.ordersTodelete = [];
  }

}
