import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppComponent
  ],
  declarations: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
