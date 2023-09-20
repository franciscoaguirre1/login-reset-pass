import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}


  login(usuario:any){
    console.log("usuario desde auth.service: ",usuario);
    const res =  this.http.post(`${environment.apiUrl}/api/v1/login`, usuario)
    return lastValueFrom(res)
  }


}
