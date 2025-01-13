import { Component, computed, effect, signal, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'signal-counter';

  count1 = signal(0);
  doubleCount1 = computed(() => this.count1() * 2)
  count2 = signal(0);
  doubleCount2 = computed(() => this.count2() * 2)
  count3 = signal(0);
  doubleCount3 = computed(() => this.count3() * 2)
  intervalId !: any;

  constructor() {
    effect(() => {
      console.log(`current value of count is Counter 1 : ${this.count1()}, - Counter 2 : ${this.count2()}, Counter 3 : ${this.count3()}`)
    })
  }

  // Basic Counter
  increment(): void {
    this.count1.update((c: number) => c + 1)
  }

  decrement(): void {
    this.count1.update((c) => c - 1)
  }

  reset(): void {
    this.count1.set(0);
  }

  // setInterval()
  start(): void {
    this.intervalId = setInterval(() => {
      this.count2.update((c) => c +
        1)
    }, 500);
  }

  stop(): void {
    clearInterval(this.intervalId)
  }

  clear(): void {
    this.count2.set(0);
  }

  // setTimeout()
  run(): void {
    setTimeout(() => {
      this.count3.update((c) => c + 1)
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
