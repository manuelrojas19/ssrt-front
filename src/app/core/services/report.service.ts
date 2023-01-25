import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { environment } from 'src/environments/environment';
import { ReportResponse } from '../interfaces/report.response';
import { Report } from '../models/report';
import { TimeEntry } from '../models/time-entry';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getAllReports() {
    return this.http.get<ReportResponse>(`${environment.API_URL}/reports`, {
      headers: new HttpHeaders({
        Authorization: Cookie.get('jwtToken'),
      }),
    });
  }

  getReportById(id: String) {
    return this.http.get<Report>(`${environment.API_URL}/reports/${id}`, {
      headers: new HttpHeaders({
        Authorization: Cookie.get('jwtToken'),
      }),
    });
  }

  createReport(request: any) {
    return this.http.post<Report>(`${environment.API_URL}/reports`, request, {
      headers: new HttpHeaders({
        Authorization: Cookie.get('jwtToken'),
      }),
    });
  }

  createTimeEntry(request: any) {
    return this.http.post<TimeEntry>(`${environment.API_URL}/time-entries`, request, {
      headers: new HttpHeaders({
        Authorization: Cookie.get('jwtToken'),
      }),
    });
  }
}
