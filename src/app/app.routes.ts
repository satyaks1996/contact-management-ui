import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

export const routes: Routes = [

    {path: '', component :EmployeeListComponent,pathMatch:"full"},
    { path: 'Add', component: AddEmployeeComponent }
];
