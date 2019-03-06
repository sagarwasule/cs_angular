import { Order } from '../models/order';

export const OrderStore: Order[] = [
    { id: 1, account: 'account1', quantity: 100, price: 100, orderBy: 'user1', orderDate: new Date(2019, 1, 1) },
    { id: 2, account: 'account2', quantity: 200, price: 70, orderBy: 'user2', orderDate: new Date(2019, 2, 1) }
];
