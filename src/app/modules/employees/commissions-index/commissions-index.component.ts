import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Pagination } from 'src/app/core/interfaces/pagination';
import { Commission } from 'src/app/core/models/commission';
import { Report } from 'src/app/core/models/report';
import { CommissionService } from 'src/app/core/services/commission.service';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-commissions-index',
  templateUrl: './commissions-index.component.html',
  styleUrls: ['./commissions-index.component.css'],
})
export class CommissionsIndexComponent implements OnInit {
  commissions: Commission[];

  pagination: Pagination;
  page: number;

  eventSuccesfullyCreated: Subject<void> = new Subject<void>();
  onCreateError: Error = null;

  reports: Report[];

  constructor(
    private commissionService: CommissionService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.getReports()
  }


  public getReports(): void {
    this.reportService.getAllReports().subscribe({
      next: (res) => {
        console.log(res.reports)
        this.reports = res.reports
      },
    });
  }

  public onCreateCommission(request: any): void {
    this.reportService.createReport(request).subscribe({
      next: () => {
        this.getReports();
        this.eventSuccesfullyCreated.next();
      },
      error: (error) => {
        this.onCreateError = error;
      },
    });
  }

  public onChangeItem(index: number) {
    this.page = index;
  }
}
