import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private apiUrl = `${environment.apiUrl}/employe`;
  private apiUrlRoles = `${environment.apiUrl}/role`;
  constructor(private http: HttpClient) { }

  // Liste
  getEmploye(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  // Create
  addEmploye(employe : any): Observable<any> {
    return this.http.post(this.apiUrl, employe);
  }

  // Update
  updateEmploye(employe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${employe._id}`, employe);
  }

  // get by id
  getEmployeById(id : string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // GetRoles pour liste et liste déroulante
  getRoles(): Observable<any>{
    return this.http.get(this.apiUrlRoles);
  }
}
