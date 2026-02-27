import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styles: ``,
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup;
  departments: Department[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      departmentId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe({
      next: (departments: Department[]) => {
        this.departments = departments;
      },
      error: (err) => {
        console.error('Failed to load departments:', err);
      },
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe({
        next: () => {
          alert('Employee created successfully!');
          this.employeeForm.reset();
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          alert('Failed to create employee.');
          console.error(err);
        },
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
