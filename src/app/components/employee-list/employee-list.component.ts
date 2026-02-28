import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

import { CommonModule, NgForOf } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { RouterModule } from '@angular/router';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: ``,
  imports: [NgForOf, CommonModule, RouterModule, FormsModule],
})
export class EmployeeListComponent {
  currentPage = 1;
  pageSize = 10;

  employees: Employee[] = [];
  searchTerm: string = '';

  get paginatedEmployees(): Employee[] {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.filteredEmployees.slice(start, start + this.pageSize);
}

get totalPages(): number {
  return Math.ceil(this.filteredEmployees.length / this.pageSize);
}

  get filteredEmployees(): Employee[] {
    if (!this.searchTerm.trim()) return this.employees;
    return this.employees.filter((emp) =>
      emp.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase()),
    );
  }

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
  constructor(
    private employeeService: EmployeeService,
    public departmentService: DepartmentService,
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data as Employee[];
    });
    this.departmentService
      .getDepartments()
      .subscribe((departments: Department[]) => {
        this.departmentService.departments = departments;
      });
  }
}
