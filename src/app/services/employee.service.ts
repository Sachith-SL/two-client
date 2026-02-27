import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private api = 'http://localhost:8080/api/one/v1/employee';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http
      .get<any>(this.api)
      .pipe(map((response) => response?.data?.content ?? []));
  }

  getEmployeeById(id: number) {
    return this.http
      .get<any>(`${this.api}/${id}`)
      .pipe(map((response) => response?.data ?? null));
  }

  createEmployee(employeeRequest: any) {
    return this.http.post(this.api, employeeRequest);
  }

  updateEmployee(id: number, employeeRequest: any) {
    return this.http.put(`${this.api}/${id}`, employeeRequest);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
