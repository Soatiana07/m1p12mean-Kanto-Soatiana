import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeDetailsService {

  private apiUrl = `${environment.apiUrl}/employe`;
  constructor(private http: HttpClient) { }

  // Get by id
  getEmployeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
