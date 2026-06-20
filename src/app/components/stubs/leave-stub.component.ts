import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leave-stub',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './leave-stub.component.html',
  styleUrls: ['./leave-stub.component.scss']
})
export class LeaveStubComponent {
  companyId: string | null = null;
  role: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.role = this.authService.getRole();
  }
}
