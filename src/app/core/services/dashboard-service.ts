import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../interfaces/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private api = environment.apiUrl + "/dashboard";

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(this.api);
  }
  
}
