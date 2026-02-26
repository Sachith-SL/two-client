import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
  {
    path: 'employee/create',
    component: EmployeeCreateComponent,
  },
  {
    path: 'employee/:id',
    component: EmployeeDetailComponent,
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent,
  },
];
