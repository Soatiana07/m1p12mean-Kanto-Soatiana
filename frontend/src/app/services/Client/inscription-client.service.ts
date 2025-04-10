import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionClientService{

  private apiUrl = `${environment.apiUrl}/client`;

  private token: string | null = localStorage.getItem('token');
  private headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

  constructor(private http: HttpClient, private router : Router) {}

  // Create
  addClient(client : any): Observable<any> {
    return this.http.post(this.apiUrl, client,  { headers: this.headers });
  }
}
