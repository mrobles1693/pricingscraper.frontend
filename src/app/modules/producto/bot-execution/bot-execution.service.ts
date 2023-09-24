import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { BotExecutionDTO, BotExecutionReportDTO } from 'src/app/shared/interfaces/BotExecutionDTO';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import { getBackUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class BotExecutionService {

  url = '';

  constructor(
    private http : HttpClient
  ) { 
    this.url = `${getBackUrl()}BotExecution/`;
  }

  getListBotExecution(): Observable<ApiResponse<BotExecutionDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<BotExecutionDTO[]>>(`${this.url}getListBotExecution`, {headers: httpHeader});
  }

  getBotExecution(nIdBotExecution : number): Observable<ApiResponse<BotExecutionDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdBotExecution', nIdBotExecution);
    return this.http.get<ApiResponse<BotExecutionDTO>>(`${this.url}getBotExecution`, {headers: httpHeader, params: httpParams});
  }

  getBotExecutionRepo(nIdBotExecution : number): Observable<ApiResponse<BotExecutionReportDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdBotExecution', nIdBotExecution);
    return this.http.get<ApiResponse<BotExecutionReportDTO[]>>(`${this.url}getBotExecutionRepo`, {headers: httpHeader, params: httpParams});
  }
}
