import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Employee } from 'src/app/core/models/employee';
import { Student } from 'src/app/core/models/student';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employees-home',
  templateUrl: './employees-home.component.html',
  styleUrls: ['./employees-home.component.css'],
})
export class EmployeesHomeComponent implements OnInit {

  student: Student;

  title = 'appBootstrap';

  model: any;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.getStudentInfo();
  }

  public getStudentInfo(): void {
    this.authenticationService.getCurrentUser().subscribe((res) => {
      this.student = res;
    });
  }
}
