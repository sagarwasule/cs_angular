export interface Order {
    id: number;
    account: string;
    quantity: number;
    price: number;
    orderBy: string;
    orderDate: Date;
}
