import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule, NgForOf } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: ``,
  imports: [NgForOf, CommonModule, RouterModule],
})
export class EmployeeListComponent {
  employees: Employee[] = [];

  isDeleting: number | null = null;
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.isDeleting = id;
      this.employeeService.deleteEmployee(id).subscribe({
        next: (res: any) => {
          this.employees = this.employees.filter((emp) => emp.id !== id);
          alert(res?.message || 'Employee deleted successfully.');
          this.isDeleting = null;
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Failed to delete employee.');
          this.isDeleting = null;
        },
      });
    }
  }
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data as Employee[];
    });
  }
}
