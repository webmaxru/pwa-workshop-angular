import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CustomMaterialModule } from './custom-material.module';
import 'hammerjs';


import { MyFeedsComponent } from './my-feeds/my-feeds.component';
import { SwSandboxComponent } from './sw-sandbox/sw-sandbox.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFeedsComponent,
    SwSandboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
