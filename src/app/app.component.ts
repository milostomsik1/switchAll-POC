import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartState } from './store/states/cart.state';
import { GetCart } from './store/actions/cart.actions';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    // this part isnt working as expected due to several calls made to cartService.cart in store
    this.store.select(CartState).subscribe(cart => console.log(cart));
    this.store.dispatch(new GetCart()).subscribe();
    this.store.dispatch(new GetCart()).subscribe();
    this.store.dispatch(new GetCart()).subscribe();
    this.store.dispatch(new GetCart()).subscribe();
    this.store.dispatch(new GetCart()).subscribe();

    // uncomment this part to see it actually working well;
    this.cartService.cart.subscribe(cart => console.log(cart));
    this.cartService.update();
    this.cartService.update();
    this.cartService.update();
    this.cartService.update();
    this.cartService.update();
  }
}
