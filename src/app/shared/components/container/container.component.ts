import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  
  @ViewChild('sideNavPrincipal')
  sideNavPrincipal!: MatSidenav;

  username : string | null = '';

  constructor(
    private authService : AuthService,
    private router : Router,
    private spinner : NgxSpinnerService,
  ){
    if(this.authService.isLogged()){
      this.username = this.authService.getUserName();
    }
  }

  closeNavBar() {
    this.sideNavPrincipal.close();
  }

  openNavBar() {
    this.sideNavPrincipal.open();
  }

  logout(){
    this.authService.logout();
  }

  navigateTo(ruta : string){
    this.router.navigate(['/'+ruta]);
  }
}
