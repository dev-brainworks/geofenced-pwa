import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

import { CompanyLoginComponent } from '../login/company-login.component';

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, CompanyLoginComponent],
  templateUrl: './company-home.component.html',
  styleUrl: './company-home.component.scss'
})
export class CompanyHomeComponent {
  companyId: string | null = null;
  role: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.role = this.authService.getRole();
  }
}
