import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css'],
})
export class EmployeelistComponent implements OnInit {
  employeeArray: any;
  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  openDialog(empId : any): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {EmpId : empId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.employeeService.deleteEmployee(empId).subscribe((resp: any) => {});
        setTimeout(()=>{
          this.getAllEmployees();
        },3000)
      }
    });
  }

  getAllEmployees() {
    this.employeeService.getEmployeesList().subscribe((resp: any) => {
      this.employeeArray = resp['data'];
      console.log(this.employeeArray);
    });
  }

  editEmployee(empId: any) {
    sessionStorage.setItem('empId', empId);
    this.router.navigate(['/employeeForm'], {
      queryParams: { employeeForm: 'edit' },
    });
    // this.employeeService.getEmployeeData(empId).subscribe((resp: any) => {});
  }

  deleteEmployee(empId: any) {
    this.openDialog(empId);
  }

  createEmployee() {
    console.log('ello');
    this.router.navigate(['/employeeForm'], {
      queryParams: { employeeForm: 'create' },
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: '../editEmployee.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onYesClick(){
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
