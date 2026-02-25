import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private api = 'http://localhost:8080/api/employee'

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(this.api);
  }

  createEmployee(employee: any) {
    return this.http.post(this.api, employee);
  }
}
