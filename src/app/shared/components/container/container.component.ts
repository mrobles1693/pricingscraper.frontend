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

  loadUserName(){
    if(localStorage.getItem('userName') == null){
      localStorage.setItem('userName', this.authService.getUserName());
    }
  }

  navigateTo(ruta : string){
    this.router.navigate(['/'+ruta]);
  }
}
