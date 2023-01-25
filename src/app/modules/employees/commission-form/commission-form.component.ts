import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-commission-form',
  templateUrl: './commission-form.component.html',
  styleUrls: ['./commission-form.component.css']
})
export class CommissionFormComponent implements OnInit {
  @Output() commissionSubmit = new EventEmitter();
  @Input() error: HttpErrorResponse;

  authForm = new FormGroup({
    from: new FormControl('', [
      Validators.required,
    ]),
    to: new FormControl('', [
      Validators.required,
    ]),
  });

  formHasErrors: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  get controls() {
    return this.authForm.controls;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.formHasErrors = true;
      return;
    }
    this.formHasErrors = false;
    this.commissionSubmit.emit(this.authForm.value);
  }

}
