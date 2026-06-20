import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

import { VendorLoginComponent } from '../login/vendor-login.component';

@Component({
  selector: 'app-vendor-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, VendorLoginComponent],
  templateUrl: './vendor-home.component.html',
  styleUrl: './vendor-home.component.scss'
})
export class VendorHomeComponent {
  role: string | null = null;

  constructor(private authService: AuthService) {
    this.role = this.authService.getRole();
  }
}
