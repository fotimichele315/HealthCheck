import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HealthCheckService, Result } from './health-check.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-health-check',
  standalone: false,
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.scss'] // <<-- NOTA styleUrls
})
export class HealthCheckComponent implements OnInit {

  public result!: Observable<Result>;

  constructor(public service: HealthCheckService) { }

  ngOnInit(): void {
    this.result = this.service.result; // ← collega l'observable del service

    this.service.startConnection();
    this.service.addDataListeners();
  }

   onRefresh(): void {
    
     this.service.sendClientUpdate();
    }
  }
 

 
