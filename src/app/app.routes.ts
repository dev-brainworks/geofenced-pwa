import { Routes } from '@angular/router';
import { VendorHomeComponent } from './components/home/vendor-home.component';
import { CompanyHomeComponent } from './components/home/company-home.component';
import { EmployeeHomeComponent } from './components/home/employee-home.component';
import { OnboardingStubComponent } from './components/stubs/onboarding-stub.component';
import { ReportsStubComponent } from './components/stubs/reports-stub.component';
import { SettingsStubComponent } from './components/stubs/settings-stub.component';
import { CalendarStubComponent } from './components/stubs/calendar-stub.component';
import { LeaveStubComponent } from './components/stubs/leave-stub.component';
import { ApprovalsStubComponent } from './components/stubs/approvals-stub.component';
import { DefaultersStubComponent } from './components/stubs/defaulters-stub.component';
import { NotificationsStubComponent } from './components/stubs/notifications-stub.component';
import { LandingComponent } from './components/home/landing.component';

export const routes: Routes = [
  // Vendor routes
  { path: 'home', component: VendorHomeComponent },
  { path: 'onboarding', component: OnboardingStubComponent },
  { path: 'reports', component: ReportsStubComponent },
  { path: 'settings', component: SettingsStubComponent },

  // Company Admin routes
  { path: ':companyId/home', component: CompanyHomeComponent },
  { path: ':companyId/reports', component: ReportsStubComponent },
  { path: ':companyId/defaulters', component: DefaultersStubComponent },
  { path: ':companyId/settings', component: SettingsStubComponent },
  { path: ':companyId/notifications', component: NotificationsStubComponent },

  // Employee routes
  { path: ':companyId/my/home', component: EmployeeHomeComponent },
  { path: ':companyId/my/calendar', component: CalendarStubComponent },
  { path: ':companyId/my/leave', component: LeaveStubComponent },
  { path: ':companyId/my/settings', component: SettingsStubComponent },
  { path: ':companyId/my/notifications', component: NotificationsStubComponent },

  // Manager-only routes
  { path: ':companyId/my/approvals', component: ApprovalsStubComponent },
  { path: ':companyId/my/defaulters', component: DefaultersStubComponent },

  // Default redirect
  { path: '', component: LandingComponent }
];
