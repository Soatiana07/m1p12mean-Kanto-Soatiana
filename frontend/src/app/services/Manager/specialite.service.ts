import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private apiUrl = `${environment.apiUrl}/specialite`;
  constructor(private http: HttpClient) { }

  // Liste
  getSpecialite(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  // Create
  addSpecialite(nomSpecialite: string): Observable<any> {
    const body ={ nomSpecialite};
    return this.http.post(this.apiUrl, body);
  }

  // Update
  updateSpecialite(id: string, nomSpecialite: string): Observable<any> {
    const body = {nomSpecialite};
    console.log(`${this.apiUrl}/${id}`);
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  // Delete
  deleteSpecialite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
