import { HttpClient, HttpResponse } from '@angular/common/http';
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

  public register(dataToSend: AuthRequest): Observable<HttpResponse<void>> {
    return this.httpClient.post<HttpResponse<void>>(this.apiUrl, dataToSend);
  }
}
