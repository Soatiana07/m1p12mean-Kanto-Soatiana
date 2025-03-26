import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = `${environment.apiUrl}/service`;
  private apiUrlCategories = `${environment.apiUrl}/categorieService`;
  constructor(private http: HttpClient) { }

  // Liste
  getService(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  // Create
  addService(service: any): Observable<any> {
    return this.http.post(this.apiUrl, service);
  }

  // Update
  updateService(id: string, service: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, service);
  }

  // Delete
  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // GetCategories
  getCategories(): Observable<any>{
    return this.http.get(this.apiUrlCategories);
  }
}
