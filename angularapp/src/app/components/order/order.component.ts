import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      account: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['']
    });
  }

  get f() { return this.orderForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }

    this.orderService.addOrders(this.orderForm.value);

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.orderForm.value));

    this.router.navigate(['./orders']);

  }

  onCancel() {
    this.router.navigate(['./orders']);
  }

}
