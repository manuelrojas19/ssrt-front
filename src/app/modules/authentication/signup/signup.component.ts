import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    academicProgram: new FormControl('', [Validators.required]),
    semester: new FormControl('', [Validators.required]),
    program: new FormControl('', [Validators.required]),
    borrower: new FormControl('', [Validators.required]),
    manager: new FormControl('', [Validators.required]),
    managerCharge: new FormControl('', [Validators.required]),
  });
  formHasErrors: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  get controls() {
    return this.authForm.controls;
  }

  ngOnInit(): void {}

  onSubmit(): void {


    console.log(this.authForm.value)

    this.formHasErrors = false;


    this.authenticationService.signup(this.authForm.value).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        if (error.status === 401) {
          this.authForm.setErrors({ credentials: true });
        } else if (!error.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
