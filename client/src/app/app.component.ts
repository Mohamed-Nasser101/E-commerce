import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "./store";
import {loadBasket} from "./store/effects/effects.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadBasket());
  }
}
