import { State, Action, StateContext, Store } from '@ngxs/store';
import { Cart, Item } from 'src/app/models/cart.model';
import { GetCart, CartLoaded } from '../actions/cart.actions';
import { produce } from 'immer';
import { Injectable } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { tap } from 'rxjs/operators';

@Injectable()
@State<Cart>({
  name: 'cart',
  defaults: {
    order: []
  }
})
export class CartState {
  constructor(private cartService: CartService, private store: Store) {
    // here we dispatch the CartLoaded Action/Event when the latest pending request
    // has a response
    this.cartService.onDataLoaded().subscribe(items =>
      store.dispatch(new CartLoaded(items))
    );
  }

  @Action(GetCart)
  GetCart(ctx: StateContext<Cart>) {
    console.log('GetCart Action');
    this.cartService.update();
    // here we could modify the state for immediate feedback to the user
  }

  @Action(CartLoaded)
  CartLoaded(ctx: StateContext<Cart>, items: Item[]) {
    console.log('CartLoaded Action');
    // here we modify the state to represent the state in the backend
    const state = produce(ctx.getState(), draft => {
      draft.order = items;
    });
    ctx.setState(state);
  }
}
