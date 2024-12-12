import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration } from '../../models/registration.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:3000/registrations"

  constructor(private http:HttpClient) {
    
   }

  getRegistrations(): Observable<Registration[]>{
    return this.http.get<Registration[]>(this.url)
   }

  addRegistration(registration: Registration): Observable<Registration>{
    return this.http.post<Registration>(this.url,registration)
   }
   
  updateRegistration(registration: Registration): Observable<Registration>{
    return this.http.patch<Registration>(`${this.url}/${registration.id}`,registration)
   }

  deleteRegistration(id: number): Observable<Registration>{
    return this.http.delete<Registration>(`${this.url}/${id}`)
   }
}
