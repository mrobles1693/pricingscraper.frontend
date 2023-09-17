import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import { UsuarioDTO } from 'src/app/shared/interfaces/UsuarioDTO';
import { getBackUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = '';

  constructor(
    private http : HttpClient
  ) { 
    this.url = `${getBackUrl()}Usuario/`;
  }

  getListUsuario(): Observable<ApiResponse<UsuarioDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<UsuarioDTO[]>>(`${this.url}getListUsuario`, {headers: httpHeader});
  }

  getUsuarioByID(nIdUsuario : number): Observable<ApiResponse<UsuarioDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdUsuario', nIdUsuario);
    return this.http.get<ApiResponse<UsuarioDTO>>(`${this.url}getUsuarioByID`, {headers: httpHeader, params: httpParams});
  }

  postInsUsuario(elemento : UsuarioDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postInsUsuario`, elemento, {headers: httpHeader});
  }
  
  postUpdUsuario(elemento : UsuarioDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postUpdUsuario`, elemento, {headers: httpHeader});
  }
}
