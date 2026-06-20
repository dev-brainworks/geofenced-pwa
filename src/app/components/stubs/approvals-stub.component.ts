import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-approvals-stub',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './approvals-stub.component.html',
  styleUrls: ['./approvals-stub.component.scss']
})
export class ApprovalsStubComponent {
  companyId: string | null = null;
  role: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.role = this.authService.getRole();
  }
}
