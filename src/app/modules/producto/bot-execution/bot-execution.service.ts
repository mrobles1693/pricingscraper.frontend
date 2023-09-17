import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { BotExecutionDTO } from 'src/app/shared/interfaces/BotExecutionDTO';
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
}
