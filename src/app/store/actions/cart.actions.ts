import { Item } from '../../models/cart.model';

export class GetCart {
  static readonly type = '[Cart] Get Cart';
  constructor() { }
}

export class CartLoaded {
  static readonly type = '[Cart] Cart Loaded';
  constructor(private items: Item[]) { }
}
