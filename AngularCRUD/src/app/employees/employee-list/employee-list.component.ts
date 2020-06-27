import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service'
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';    
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService,private toastr : ToastrService) { }
  employeeList: any;
  ngOnInit() {
    this.employeeService.getEmployeeList()

    .subscribe(
      res => {
        console.log(res);
        this.employeeList = res['data'];
      }
    )
  }

  showForEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);;
  }

  showData() {
    this.employeeService.getEmployeeList();
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(id)
      .subscribe(x => {
        this.employeeService.getEmployeeList();
        this.toastr.warning("Deleted Successfully","Employee Register");
      })
    }
  }
}
