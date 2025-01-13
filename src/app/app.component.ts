import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signal-counter';

  count = signal(0);
  doubleCount = computed(() => this.count() * 2)

  constructor() {
    effect(() => {
      console.log(`current value of count is ${this.count()}`);
    })
  }

  increment() {
    this.count.update((c: number) => c + 1)
  }

  decrement() {
    this.count.update((c) => c - 1)
  }

  reset() {
    this.count.set(0);
  }
}
