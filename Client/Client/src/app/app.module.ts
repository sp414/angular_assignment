import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DetailsComponent } from './transaction/details/details.component';
import { CommonModule, DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
