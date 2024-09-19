import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../../interfaces/auth-request';
import { AuthResponse } from '../../../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService { 
  private apiUrl = 'http://localhost:5004/api/auth';
  public constructor(
    private httpClient: HttpClient, 
  ) { }

  public requestToken(dataToSend: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.apiUrl, dataToSend);
  }
}
