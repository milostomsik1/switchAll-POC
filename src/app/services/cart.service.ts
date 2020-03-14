import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { delay, switchAll } from 'rxjs/operators';
import { Item } from '../models/cart.model';

@Injectable({providedIn: 'root'})
export class CartService {
  private queue = new Subject<Observable<Item[]>>();

  constructor(private httpClient: HttpClient) { }

  // this part is working well if we just use it without store
  get cart(): Observable<Item[]> {
    return this.queue
      .asObservable()
      .pipe(
        switchAll()
      );
  }

  update() {
    const request = this.httpClient
      .get<Item[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        delay(Math.round(Math.random() * 1000) + 500)
      );

    this.enqueue(request);
  }

  private enqueue(request: Observable<any>) {
    this.queue.next(request);
  }
}
