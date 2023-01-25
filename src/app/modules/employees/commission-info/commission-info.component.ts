import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommissionResponse } from 'src/app/core/interfaces/commission.response';
import { CreateTimeEntry } from 'src/app/core/interfaces/create.time.entry';
import { Pagination } from 'src/app/core/interfaces/pagination';
import { Commission } from 'src/app/core/models/commission';
import { Facture } from 'src/app/core/models/facture';
import { Report } from 'src/app/core/models/report';
import { TimeEntry } from 'src/app/core/models/time-entry';
import { CommissionService } from 'src/app/core/services/commission.service';
import { FactureService } from 'src/app/core/services/facture.service';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-commission-info',
  templateUrl: './commission-info.component.html',
  styleUrls: ['./commission-info.component.css'],
})
export class CommissionInfoComponent implements OnInit {
  commission: Commission;
  report: Report;
  notFoundError: boolean = false;

  factures: Facture[];
  facturesPagination: Pagination;
  facturesPage: number = 1;

  eventSuccesfullyCreated: Subject<void> = new Subject<void>();
  error: Error = null;

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.reportService.getReportById(this.route.snapshot.params.id).subscribe({
      next: (res) => {
        this.report = res;
        console.log(this.report)
      },
      error: (error) => {
        this.notFoundError = true;
      },
    });
  }

  onChangeFacturePage(index: number) {
    this.facturesPage = index;
    this.getData();
  }

  onCreateFacture(data: CreateTimeEntry) {
    data.reportId = this.report.objectId
    console.log(data)
    this.reportService
      .createTimeEntry(data)
      .subscribe({
        next: () => {
          this.getData();
          this.eventSuccesfullyCreated.next();
        },
        error: (error) => {
          this.error = error;
        },
      });
  }
}
