import { Component, computed, effect, signal, OnDestroy, linkedSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'signal-counter';

  //Notes:
  // Signal() is wrapper around the value and sends the latest value to the consumer by detecting it once the property value changes, it handles the reactivity.
  // 1=> before angular is introducing signals() we were dependent on angular change detection strategy/cycles for logging it using ngDoCheck() hook.
  // If we make the application as zoneless by removing Zone.js from polyfills object in Angular.json file and replace provideZoneChangeDetection() with provideExperimentalZonelessChangeDetection() app.config.ts angular doesn't have enoguh capacity to bind the changes in template so that's why Signals() came into the picture.
  // 2=> ChangeDetecionStrategy disadvantage is it will execute even if we trigger the event but not chnging the value.
  // 3=> since angular depends on zone.js it increases the bundle size and it will inform angular which component/which part of the component has been changed even if small changes happened in one component it will renders all the component
  // zoneless will hdanle change detection by default for callbacks()/manual event trigger, observable async pipe, property received as input() without even usinng signals()
  // 4=> CMD to clean unused imports in standalone components
  // ng g @angular/core:cleanup-unused-imports 

  typedText = signal('type something');

  count1 = signal(0);
  doubleCount1 = computed(() => this.count1() * 2)
  count2 = signal(0);
  doubleCount2 = computed(() => this.count2() * 2)
  count3 = signal(0);
  doubleCount3 = linkedSignal(() => this.count3() * 2)
  intervalId !: any;

  color = signal<string[]>(['Red', 'Blue'])
  newColorRender = signal<string>('')

  constructor() {
    effect(() => {
      console.log(`current value of count is Counter 1 : ${this.count1()}, - Counter 2 : ${this.count2()}, Counter 3 : ${this.count3()}`)

      //colors
      this.newColorRender.set(`with newly added colors is displaying above i.e. ${this.color()}`)
    })
  }

  ngOnInit(): void {
    // Colors
    setTimeout(() => {
      this.color.update((colors: any) => [...colors, 'Green'])
    }, 2000);
  }

  onType(event: Event): void {
    const text = (event.target as HTMLInputElement).value
    this.typedText.set(text);
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

  TenX(): void {
    this.doubleCount3.update((x) => x * 10)
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
