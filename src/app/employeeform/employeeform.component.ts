import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css'],
})
export class EmployeeformComponent implements OnInit {
  employeeForm!: FormGroup;
  empData: any;
  type: any;
  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      emailId: ['', Validators.required],
      dob: ['', Validators.required],
      dept: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.type = res['employeeForm'];
      if (this.type === 'edit') {
        let empId = sessionStorage.getItem('empId');
        this.getEmployeeData(empId);
      }
    });
  }

  getEmployeeData(empId: any) {
    this.employeeService.getEmployeeData(empId).subscribe((resp: any) => {
      this.empData = resp['data'];
      this.employeeForm.patchValue({
        fname: this.empData.fname,
        lname: this.empData.lname,
        emailId: this.empData.emailId,
        dob: this.empData.dob,
        dept: this.empData.dept,
      });
    });
  }

  submitEmpData() {
    if (this.type.toLowerCase() === 'edit') {
      let empId = sessionStorage.getItem('empId');
      let data = Object.assign({ empId: empId }, this.employeeForm.value);
      this.employeeService.updateEmployee(data).subscribe((resp) => {});
      setTimeout(() => {
        this.router.navigate(['/employeeList']);
      }, 3000);
    } else {
      let data = Object.assign(this.employeeForm.value);
      this.employeeService.createEmployee(data).subscribe((res) => {});
      setTimeout(() => {
        this.router.navigate(['/employeeList']);
      }, 3000);
    }
  }

  goBack() {
    this.router.navigate(['/employeeList']);
  }
}
