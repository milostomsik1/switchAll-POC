import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartState } from './store/states/cart.state';
import { GetCart } from './store/actions/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.select(CartState).subscribe(cart => console.log(cart));
    this.store.dispatch(new GetCart()).subscribe();
    this.store.dispatch(new GetCart()).subscribe();
    this.store.dispatch(new GetCart()).subscribe();
    this.store.dispatch(new GetCart()).subscribe();
    this.store.dispatch(new GetCart()).subscribe();
  }
}
