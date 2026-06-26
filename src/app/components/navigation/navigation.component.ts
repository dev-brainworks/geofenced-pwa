import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  label: string;
  link?: string;
  onClick?: () => void;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  menuItems: MenuItem[] = [];
  isMobile: boolean = false;
  companyId: string | null = null;
  role: string | null = null;
  // Add a flag to control rendering
  isMenuOpen = false;



  constructor(
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.companyId = this.authService.getCompanyId();
    this.buildMenu();

    this.authService.roleState$.subscribe(({ role, companyId }: { role: string | null; companyId: string | null }) => {
      this.role = role;
      this.companyId = companyId;
      this.buildMenu();
    });

    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  buildMenu(): void {
    if (!this.role) {
      this.menuItems = [];
      return;
    }

    if (this.role === 'vendor') {
      this.menuItems = [
        { label: 'Home', link: '/home' },
        { label: 'Onboarding', link: '/onboarding' },
        { label: 'Reports', link: '/reports' },
        { label: 'Settings', link: '/settings' }
      ];
    } else if (this.role === 'admin') {
      this.menuItems = [
        { label: 'Home', link: `/${this.companyId}/home` },
        { label: 'Reports', link: `/${this.companyId}/reports` },
        { label: 'Defaulters', link: `/${this.companyId}/defaulters` },
        { label: 'Settings', link: `/${this.companyId}/settings` },
        { label: 'Notifications', link: `/${this.companyId}/notifications` }
      ];
    } else if (this.role === 'employee' || this.role === 'manager') {
      this.menuItems = [
        { label: 'Home', link: `/${this.companyId}/my/home` },
        { label: 'Calendar', link: `/${this.companyId}/my/calendar` },
        { label: 'Leave', link: `/${this.companyId}/my/leave` },
        { label: 'Settings', link: `/${this.companyId}/my/settings` },
        { label: 'Notifications', link: `/${this.companyId}/my/notifications` }
      ];

      if (this.role === 'manager') {
        this.menuItems.push(
          { label: 'Approvals', link: `/${this.companyId}/my/approvals` },
          { label: 'Defaulters', link: `/${this.companyId}/my/defaulters` }
        );
      }
    }

    this.menuItems.push({ label: 'Logout', onClick: () => this.logout() });
  }

  handleMenuItemClick(item: MenuItem): void {
    if (item.onClick) {
      item.onClick();
    }
    this.closeMenu(); // always close after click
  }
  
  logout(): void {
    this.authService.logout();
  }
}
