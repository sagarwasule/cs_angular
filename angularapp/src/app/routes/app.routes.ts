import { Routes } from '@angular/router';
import { OrdersComponent } from '../components/orders/orders.component';
import { OrderComponent } from '../components/order/order.component';

export const appRoutes: Routes = [
    // basic routes
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent },
    { path: 'order/:id', component: OrderComponent },
    { path: 'addorder', component: OrderComponent }
];
