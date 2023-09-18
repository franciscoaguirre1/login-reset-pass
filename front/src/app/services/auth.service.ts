import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl: string = "https://localhost:8090/api/v1/";

  constructor(private http: HttpClient) {}

  // signUp(userObj: any) {
  //   return this.http.post<any>(`${this.baseUrl}register`, userObj)
  // }

  signUp(firstName: any, lastName: any, email: any, userName: any, password: any){
    const data = {firstName, lastName, email, userName, password}
    const res =  this.http.post(`${environment.apiUrl}/api/v1/auth/register`, data)
    return lastValueFrom(res)
  }

  login(username: any, pass: any){
    const data = {username, pass}
    const res =  this.http.post(`${environment.apiUrl}/api/v1/auth/login`, data)
    return lastValueFrom(res)
  }


}
