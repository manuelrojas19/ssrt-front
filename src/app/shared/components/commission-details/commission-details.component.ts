import { Component, Input, OnInit } from '@angular/core';
import { Commission } from 'src/app/core/models/commission';
import { Report } from 'src/app/core/models/report';

@Component({
  selector: 'app-commission-details',
  templateUrl: './commission-details.component.html',
  styleUrls: ['./commission-details.component.css']
})
export class CommissionDetailsComponent implements OnInit {
  @Input() commission: Commission;
  @Input() report: Report;

  constructor() { }

  ngOnInit(): void {
  }

}
