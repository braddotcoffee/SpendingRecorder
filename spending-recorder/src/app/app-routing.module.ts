import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';

const routes: Routes = [
  {
    path: "",
    component: ExpenseEntryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
