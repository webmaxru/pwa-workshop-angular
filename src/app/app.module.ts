import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SwSandboxComponent } from './sw-sandbox/sw-sandbox.component';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import {AppShellModule} from '@angular/app-shell'


@NgModule({
  declarations: [
    AppComponent,
    SwSandboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
