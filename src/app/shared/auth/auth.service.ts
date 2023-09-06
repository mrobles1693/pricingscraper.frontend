import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getBackUrl } from 'src/main';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = '';

  constructor(
    private http : HttpClient,
    private router : Router,
    private dialogRef: MatDialog
  ) { 
    this.url = `${getBackUrl()}Auth/`;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUserId(): number {
    return Number(JSON.parse(window.atob(this.getToken()!.split('.')[1])).userId);
  }

  public getUserName(): string {
    return JSON.parse(window.atob(this.getToken()!.split('.')[1])).userName;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.dialogRef.closeAll();
    this.router.navigate(['/']);
  }

  public isLogged(){
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined){
      this.logout();
      return false;
    }
    return true;
  }

  login(user : string, pass : string): Observable<ApiResponse<string>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<string>>(`${this.url}AuthLogin`, {sUsuario : user, sPassword : pass}, {headers: httpHeader});
  }
}
