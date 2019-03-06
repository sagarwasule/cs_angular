import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  orderForm: FormGroup;
  order: Order = new Order();
  id: number;
  submitted = false;
  private sub: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = Number(params['id']);

      if (this.id && this.id > 0) {
        this.order = this.orderService.getOrderById(this.id);
      }
    });
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      account: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['']
    });

    if (this.order != null) {
      this.orderForm.controls['account'].setValue(this.order.account);
      this.orderForm.controls['quantity'].setValue(this.order.quantity);
      this.orderForm.controls['price'].setValue(this.order.price);
    }
  }

  get f() { return this.orderForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }

    this.order.account = this.orderForm.value.account;
    this.order.quantity = this.orderForm.value.quantity;
    this.order.price = this.orderForm.value.price;

    this.orderService.addOrders(this.order);

    this.router.navigate(['./orders']);

  }

  onCancel() {
    this.router.navigate(['./orders']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
