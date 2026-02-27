import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-employee-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./employee-edit.component.html`,
  styles: ``,
})
export class EmployeeEditComponent {

  employee: Employee | null = null;
  departments: Department[] = [];
  employeeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      departmentId: ['', Validators.required],
    });
  }

    ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.getEmployeeById(+id).subscribe((data) => {
        this.employee = data as Employee;
        this.employeeForm.patchValue({
          name: this.employee.name,
          salary: this.employee.salary,
          departmentId: this.employee.departmentId,
        });
      });

          this.departmentService.getDepartments().subscribe({
            next: (departments: Department[]) => {
              this.departments = departments;
            },
            error: (err) => {
              console.error('Failed to load departments:', err);
            },
          });
    }
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.employeeForm.valid && id) {
      this.employeeService.updateEmployee(+id, this.employeeForm.value).subscribe({
        next: () => {
          alert('Employee updated successfully!');
          this.employeeForm.reset();
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          alert('Failed to update employee.');
          console.error(err);
        },
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
