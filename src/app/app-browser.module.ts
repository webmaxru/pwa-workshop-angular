import {AppShellModule} from '@angular/app-shell'
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppShellModule.runtime(),
    AppModule
  ],
  providers: []
})
export class AppBrowserModule {}
