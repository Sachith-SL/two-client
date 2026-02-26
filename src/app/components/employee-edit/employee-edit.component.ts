import { Component } from '@angular/core';
import { EmployeeDto } from '../../models/employee-dto.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./employee-edit.component.html`,
  styles: ``,
})
export class EmployeeEditComponent {

  employee: EmployeeDto | null = null;
  employeeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

    ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.getEmployeeById(+id).subscribe((data) => {
        this.employee = data as EmployeeDto;
        this.employeeForm.patchValue({
          name: this.employee.name,
          address: this.employee.address,
        });
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
