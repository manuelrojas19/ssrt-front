import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements OnInit {
  @Output() factureSubmit = new EventEmitter();
  @Input() error: HttpErrorResponse;
  formHasErrors: boolean;

  authForm = new FormGroup({
    date: new FormControl( [
      Validators.required,
    ]),
    entryTime: new FormControl('', [
      Validators.required,
    ]),
    exitTime: new FormControl('', [
      Validators.required,
    ]),
    workedHours: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  get controls() {
    return this.authForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.authForm.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit(): void {

    this.factureSubmit.emit(this.authForm.value);
  }

}
