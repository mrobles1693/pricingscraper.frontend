import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { PresentacionDTO } from 'src/app/shared/interfaces/PresentacionDTO';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import { getBackUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {

  url = '';

  constructor(
    private http : HttpClient
  ) { 
    this.url = `${getBackUrl()}Presentacion/`;
  }

  getListPresentacion(): Observable<ApiResponse<PresentacionDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<PresentacionDTO[]>>(`${this.url}getListPresentacion`, {headers: httpHeader});
  }

  getPresentacionByID(nIdPresentacion : number): Observable<ApiResponse<PresentacionDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdPresentacion', nIdPresentacion);
    return this.http.get<ApiResponse<PresentacionDTO>>(`${this.url}getPresentacionByID`, {headers: httpHeader, params: httpParams});
  }

  postInsPresentacion(elemento : PresentacionDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postInsPresentacion`, elemento, {headers: httpHeader});
  }
  
  postUpdPresentacion(elemento : PresentacionDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postUpdPresentacion`, elemento, {headers: httpHeader});
  }
}
