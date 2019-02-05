import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGaurd } from './shared/services/auth.gaurd';
import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';
// tslint:disable-next-line:max-line-length
import { AdminLayoutSidebarCompactComponent } from './shared/components/layouts/admin-layout-sidebar-compact/admin-layout-sidebar-compact.component';

const adminRoutes: Routes = [
    {
      path: 'customer',
      loadChildren: './views/customer/dashboard.module#DashboardModule'
    },
  ];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer/v1',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'admin-rc/v1',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'admin-rt/v1',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule'
      }
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'others',
        loadChildren: './views/others/others.module#OthersModule'
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutSidebarCompactComponent,
    canActivate: [AuthGaurd],
    children: adminRoutes
  },
  /* {
    path: '**',
    redirectTo: 'others/404'
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
