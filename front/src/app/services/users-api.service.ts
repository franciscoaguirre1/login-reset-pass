import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private http: HttpClient) { }


  crearUsuario(userData: any) {
    console.log("userdata desde users.api:",userData);
    return this.http.post(`${environment.apiUrl}/api/v1/signup/`, userData).toPromise()
  }

}
