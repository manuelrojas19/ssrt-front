import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(45),
    ]),
  });
  formHasErrors: boolean;

  constructor(
    private AuthenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get controls() {
    return this.authForm.controls;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.formHasErrors = true;
      return;
    }

    this.formHasErrors = false;

    this.AuthenticationService.login(this.authForm.value).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/alumnos/home');
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
