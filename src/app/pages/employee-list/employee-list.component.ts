import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  imports: [],
  template: `
    <p>
      employee-list works!
    </p>
  `,
  styles: ``
})

    // {
    //     "id": 1,
    //     "name": "John Doe",
    //     "address": {
    //         "id": 1,
    //         "name": "Home Address"
    //     }
    // }
export class EmployeeListComponent {

  constructor (private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data) => {
      console.log(data);
    });
  }

}
