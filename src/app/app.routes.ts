import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit.component';

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
    path: 'employee/:id',
    component: EmployeeDetailComponent,
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent,
  },
];
