import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reports-stub',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './reports-stub.component.html',
  //styleUrl: './reports-stub.component.scss'
  styleUrls: ['./reports-stub.component.scss']
})
export class ReportsStubComponent {
  companyId: string | null = null;
  role: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.role = this.authService.getRole();
  }
}
