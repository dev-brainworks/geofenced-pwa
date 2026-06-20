import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import * as L from 'leaflet';
import * as geolib from 'geolib';

@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.scss'
})
export class EmployeeHomeComponent implements AfterViewInit {
  companyId: string | null = null;
  role: string | null = null;
  username: string | null = null;

  userLat: number = 0;
  userLon: number = 0;

  // My House mock data
  //companyLat: number = 19.027718;
  //companyLon: number = 73.015404;

  // Some turbhe area mock data
  companyLat: number = 19.070535;
  companyLon: number = 73.005832;

  isWithinFence: boolean = false;

  currentDate: string = '';
  currentTime: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.role = this.authService.getRole();
    this.username = this.authService.getUsername(); // Mocked username
    this.currentDate = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    this.currentTime = new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata'
    });
  }

  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLat = position.coords.latitude;
      this.userLon = position.coords.longitude;

      this.isWithinFence = geolib.isPointWithinRadius(
        { latitude: this.userLat, longitude: this.userLon },
        { latitude: this.companyLat, longitude: this.companyLon },
        200 // radius in meters
      );

      // 🧭 Compute bounding box (200 m radius)
      const bounds = geolib.getBoundsOfDistance(
        { latitude: this.userLat, longitude: this.userLon },
        200
      );

      const map = L.map('map', {
        maxBounds: [
          [bounds[0].latitude, bounds[0].longitude],
          [bounds[1].latitude, bounds[1].longitude]
        ],
        maxBoundsViscosity: 1.0,
        zoomControl: false,        // hides zoom buttons
        dragging: false,           // disables panning
        scrollWheelZoom: false,    // disables scroll zoom
        doubleClickZoom: false,    // disables double-click zoom
        boxZoom: false,            // disables box selection zoom
        keyboard: false,           // disables keyboard navigation
        touchZoom: false           // disables pinch zoom on mobile
      }).setView([this.userLat, this.userLon], 19);

      map.whenReady(() => {
        map.invalidateSize(); // ensures proper tile alignment
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        noWrap: true
      }).addTo(map);

      const greenIcon = L.icon({
        iconUrl: 'assets/icons/greenmarker.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });

      const redIcon = L.icon({
        iconUrl: 'assets/icons/redmarker.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });

      L.marker([this.userLat, this.userLon], {
        icon: this.isWithinFence ? greenIcon : redIcon
      }).addTo(map);
    });
  }
}
