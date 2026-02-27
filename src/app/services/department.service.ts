import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private api = 'http://localhost:8080/api/one/v1/department';
  departments: Department[] = [];

  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http
      .get<any>(this.api)
      .pipe(map((response: any) => response?.data?.content ?? []));
  }

  getDepartmentById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  createDepartment(departmentRequest: any) {
    return this.http.post(this.api, departmentRequest);
  }

  updateDepartment(id: number, departmentRequest: any) {
    return this.http.put(`${this.api}/${id}`, departmentRequest);
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  getDepartmentName(departmentId: number) {
    const department = this.departments.find(
      (dept) => dept.id === departmentId,
    );
    return department ? department.name : 'Unknown';
  }
}
