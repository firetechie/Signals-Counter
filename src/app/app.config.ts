import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // till v16 if we enable the SSR to the application; without hydration, it leads to UI flickering because for example in our app we have multiple posts need to display so wwhen user will request to server, server sends the response back to the browser with lists of posts, then browser will parse and disaply in the UI then destroy the server side DOM and replace with client side one.
    // so provideClientHydration will tries to match the existing UI structure instead of destryoing and rerendering the DOM
    provideClientHydration(),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes)]
};
