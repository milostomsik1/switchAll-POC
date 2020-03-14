import { State, Action, StateContext } from '@ngxs/store';
import { Cart, Item } from 'src/app/models/cart.model';
import { GetCart } from '../actions/cart.actions';
import { produce } from 'immer';
import { Injectable } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { tap, switchAll, mergeAll } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
