import { State, Action, StateContext } from '@ngxs/store';
import { Cart } from 'src/app/models/cart.model';
import { GetCart } from '../actions/cart.actions';
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
  constructor(private cartService: CartService) { }

  @Action(GetCart)
  GetCart(ctx: StateContext<Cart>) {
    this.cartService.update();

    // The issue is here, this is causing multiple responses
    return this.cartService.cart.pipe(
      tap(cart => {
        const state = produce(ctx.getState(), draft => {
          draft.order = cart;
        });
        ctx.setState(state);
      })
    );
  }
}
