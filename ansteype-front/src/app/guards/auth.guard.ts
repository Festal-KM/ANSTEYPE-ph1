import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('ansteype_token'); // 读取 token

    if (!token) { 
      // 🚀 如果没有 token，且目标不是 login，就跳转 login
      if (state.url !== '/login') {
        this.router.navigate(['/login']);
      }
      return false;
    }

    return true; // 有 token，允许访问
  }
}
