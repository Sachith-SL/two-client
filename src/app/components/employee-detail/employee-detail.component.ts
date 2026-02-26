import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeDto } from '../../models/employee-dto.model';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule],
  templateUrl: `./employee-detail.component.html`,
  styles: ``
})
export class EmployeeDetailComponent {

    employee: EmployeeDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.getEmployeeById(+id).subscribe((data) => {
        this.employee = data as EmployeeDto;
      });
    }
  }

  
}
