import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../../interfaces/auth-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService { 
  private apiUrl = 'http://localhost:5004/api/auth'; // port mozda moze da se razlikuje od okruzenja do okruzenja

  public constructor(
    private httpClient: HttpClient, 
  ) { }

  public requestToken(dataToSend: AuthRequest): Observable<Object> {
    return this.httpClient.post(this.apiUrl, dataToSend);
  }
}
