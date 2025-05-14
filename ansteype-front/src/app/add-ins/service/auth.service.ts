import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = 'authorize/authorize'; // FastAPI 端点

  constructor(private http: HttpClient) {}

  // 获取 Google OAuth URL
  getAuthUrl() {
    return this.http.get<{ auth_url: string }>(this.backendUrl);
  }
}