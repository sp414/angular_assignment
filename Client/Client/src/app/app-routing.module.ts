import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DetailsComponent } from './transaction/details/details.component';

const routes: Routes = [
  {path:'', component:TransactionComponent},
  {path:'details', component:DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
