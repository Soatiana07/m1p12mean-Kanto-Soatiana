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
  addService(idCategorie: string, nomService: string, prixBase: string): Observable<any> {
    const body ={ idCategorie, nomService, prixBase};
    return this.http.post(this.apiUrl, body);
  }

  // Update
  updateService(id: string, idCategorie: string, nomService: string, prixBase: string): Observable<any> {
    const body = {idCategorie, nomService, prixBase};
    console.log(`${this.apiUrl}/${id}`);
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  // Delete
  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // GetCategories
  getCategories(): Observable<any>{
    return this.http.get(this.apiUrlCategories);
  }

  private apiUrlService = `${environment.apiUrl}/service/chercheService`;
  searchService(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlService}?q=${query}`);
  }
}
