import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styles: ``,
})
export class EmployeeCreateComponent {
  employeeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
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
