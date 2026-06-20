import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-company-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './company-login.component.html',
  styleUrl: './company-login.component.scss'
})
export class CompanyLoginComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  companyId: string | null = null;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
  }

  login(): void {
    if (this.role === 'admin' && this.username === 'admin' && this.password === 'password') {
      this.authService.login('admin', this.companyId!);
    } else if (this.role === 'employee' && this.username === 'employee' && this.password === 'password') {
      this.authService.login('employee', this.companyId!);
    } else if (this.role === 'manager' && this.username === 'manager' && this.password === 'password') {
      this.authService.login('manager', this.companyId!);
    } else {
      alert('Invalid Company credentials');
    }
  }
}
