import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Employee} from'./employee.model'

@Injectable()
export class EmployeeService {

  selectedEmployee : Employee;
  employeeList : Employee[];
  constructor(private http : Http) { } 

  postEmployee(emp : Employee){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://dummy.restapiexample.com/api/v1/create',body,requestOptions).map(x => x.json());
  }

  putEmployee(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://dummy.restapiexample.com/api/v1/employees' + id,
      body,
      requestOptions).map(res => res.json());
  }
  getEmployeeList(){
    this.http.get('http://dummy.restapiexample.com/api/v1/employees')
    .map((data : Response) =>{
      console.warn(data.json()+"****************************");     
      // this.data 
      // return data.json();
      return data.json() as Employee[];
    }).toPromise().then(x => {
      this.employeeList = x;
      console.warn(this.employeeList+"****************************");
    })
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://dummy.restapiexample.com/api/v1/employees' + id).map(res => res.json());
  }
}
