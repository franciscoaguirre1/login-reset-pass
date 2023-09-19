import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private jwt: JwtService) {}



    
    ngOnInit(): void {
      try {
        const token_data: any = this.jwt.parse()
      } catch (error) {
        this.router.navigate(['/login'])
      }
  
      
    }

  leerUsuarios() {    
  }

  editarUsuario(id: any) {
  }

  eliminarUsuario(id:any) {

  }

}
