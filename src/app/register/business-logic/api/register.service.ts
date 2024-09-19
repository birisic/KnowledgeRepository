import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../../../interfaces/auth-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService { 
  private apiUrl = 'http://localhost:5004/api/users';

  public constructor(
    private httpClient: HttpClient, 
  ) { }

  // public requestToken(dataToSend: AuthRequest): Observable<AuthResponse> {
  //   return this.httpClient.post<AuthResponse>(this.apiUrl, dataToSend);
  // }
}
