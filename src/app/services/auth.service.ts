import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
      
      constructor(private router: Router) { }

      setValues(token: string, roleUUID: string,userInfo: any) {
            localStorage.setItem('tactylAdminToken', token)
            localStorage.setItem('role_uuid', roleUUID);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
      }

      getToken() {
            return localStorage.getItem('tactylAdminToken')
      };

      getUserInfo() {
            return JSON.parse(localStorage.getItem('userInfo') || '{}');
      }

      isLogedIn() {
            return this.getToken() !== null
      }

      logout(): void {
            localStorage.removeItem('role_uuid');
            localStorage.removeItem('tactylAdminToken');
            localStorage.removeItem('userInfo');
            this.router.navigateByUrl('/');
      };

      getRoleUUID(): string | null {
            return localStorage.getItem('role_uuid');
      }
}