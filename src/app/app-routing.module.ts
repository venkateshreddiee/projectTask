import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeformComponent } from './employeeform/employeeform.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';

const routes: Routes = [
  { path: 'employeeForm', component: EmployeeformComponent },
  { path: 'employeeList', component: EmployeelistComponent },
  { path: '', component: EmployeelistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
