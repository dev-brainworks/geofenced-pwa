import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vendor-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './vendor-login.component.html',
  styleUrl: './vendor-login.component.scss'
})
export class VendorLoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.username === 'vendor' && this.password === 'password') {
      this.authService.login('vendor');
    } else {
      alert('Invalid Vendor credentials');
    }
  }
}
