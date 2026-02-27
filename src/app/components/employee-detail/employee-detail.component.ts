import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule],
  templateUrl: `./employee-detail.component.html`,
  styles: ``,
})
export class EmployeeDetailComponent {
  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    public departmentService: DepartmentService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.getEmployeeById(+id).subscribe((data) => {
        this.employee = data as Employee;
      });
    this.departmentService
      .getDepartments()
      .subscribe((departments: Department[]) => {
        this.departmentService.departments = departments;
      });

    }
  }
}
