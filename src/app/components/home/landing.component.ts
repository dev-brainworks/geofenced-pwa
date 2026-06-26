import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToVendor(): void {
    this.router.navigate(['/login']);
  }

  goToApexHome(): void {
    this.router.navigate(['/apex/home']);
  }
}
