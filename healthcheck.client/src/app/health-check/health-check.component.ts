import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-health-check',
  standalone: false,
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.scss'] // <<-- NOTA styleUrls
})
export class HealthCheckComponent implements OnInit {

  public result?: Result;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Result>(`${environment.baseUrl}api/health`).subscribe({
      next: res => this.result = res,
      error: err => console.error(err)
    });
  }
}

 
interface Result {
  checks: Check[],
  totalStatus: string,
  totalResponseTime:string
}
interface Check {
  name: string,
  responseTime: number,
  status: string,
  description: string
}
