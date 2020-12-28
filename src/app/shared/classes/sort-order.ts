export enum Order {
  Asc = 1,
  Des = -1,
}

export class SortOrder {
  label: string;
  key: string;
  order: Order;

  constructor(key: string, label: string, order: Order) {
    this.key = key;
    this.label = label;
    this.order = order;
  }
}
