import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeesList() {
    return this.http.get('https://ml.thelightbulb.ai/api/employees');
  }

  createEmployee(data: any) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('https://ml.thelightbulb.ai/api/employees', data, {
      headers: header,
    });
  }

  updateEmployee(data: any) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `https://ml.thelightbulb.ai/api/employees/${data.empId}`,
      data,
      { headers: header }
    );
  }

  getEmployeeData(data: any) {
    return this.http.get(`https://ml.thelightbulb.ai/api/employees/${data}`);
  }

  deleteEmployee(data: any) {
    return this.http.delete(`https://ml.thelightbulb.ai/api/employees/${data}`);
  }
}
