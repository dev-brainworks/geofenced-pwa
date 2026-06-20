import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-notifications-stub',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './notifications-stub.component.html',
  styleUrls: ['./notifications-stub.component.scss']
})
export class NotificationsStubComponent {
  companyId: string | null = null;
  role: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.role = this.authService.getRole();
  }
}
