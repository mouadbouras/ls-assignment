import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LsLocationSelectModule } from './ls-location-select';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, LsLocationSelectModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
