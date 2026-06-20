import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string | null = null;
  private username: string | null = null;
  private companyId: string | null = null;
  private roleState = new BehaviorSubject<{ role: string | null, companyId: string | null }>({ role: null, companyId: null });
  roleState$ = this.roleState.asObservable();

  constructor(private router: Router) {}

  login(role: string, companyId?: string): void {
    this.role = role;
    this.companyId = companyId || null;
    this.roleState.next({ role, companyId: companyId || null });

    if (role === 'vendor') {
      this.router.navigate(['/home']);
    } else if (role === 'admin') {
      this.router.navigate([`/${this.companyId}/home`]);
    } else if (role === 'employee' || role === 'manager') {
      this.setUsername('Rahul')
      this.router.navigate([`/${this.companyId}/my/home`]);
    }
  }
  
  setRole(role: string | null): void {
    this.role = role;
  }

  getRole(): string | null {
    return this.role;
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }

  getCompanyId(): string | null {
    return this.companyId;
  }

  logout(): void {
    const currentRole = this.role;
    const currentCompanyId = this.companyId;

    this.role = null;
    this.companyId = null;

    // 🔑 Notify subscribers that role is cleared
    this.roleState.next({ role: null, companyId: null });

    if (currentRole === 'vendor') {
      this.router.navigate(['/']);
    } else if (currentRole === 'admin' || currentRole === 'employee' || currentRole === 'manager') {
      this.router.navigate([`/${currentCompanyId}/home`]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
