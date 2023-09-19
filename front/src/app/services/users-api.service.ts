import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private http: HttpClient) { }


  crearUsuario(userData: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/usuarios/`, userData).toPromise()
  }

  leerUsuarios() {
    return this.http.get(`${environment.apiUrl}/api/v1/usuarios`).toPromise()
  }

  leerUsuario(idUsuario: any) {
    return this.http.get(`${environment.apiUrl}/api/v1/usuarios/${idUsuario}`).toPromise()
  } 
  
  eliminarUsuario(idUsuario: any) {
    return this.http.delete(`${environment.apiUrl}/api/v1/usuarios/${idUsuario}`).toPromise()
  }
  
  editarUsuario(userData: any) {
    return this.http.put(`${environment.apiUrl}/api/v1/usuarios/`, userData).toPromise()
  }

}
