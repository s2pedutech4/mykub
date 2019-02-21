import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LawyerComponent } from './layouts/lawyer/lawyer.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminUserComponent } from './layouts/admin-user/admin-user.component';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { NewNavbarComponent } from './new-navbar/new-navbar.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes =[
  {
    path: '',
    // redirectTo: 'start',
    component: NewNavbarComponent,
    pathMatch: 'full',
    
  }, 
  { path: 'start',      component: NewNavbarComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'signup',   component: SignupComponent },
  { path: 'otp',   component: OtpComponent },
  { path: 'profile',   component: ProfilePageComponent },
  { path: 'chat',   component: ChatComponent },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '',
    component: LawyerComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/lawyer/lawyer.module#LawyerModule'
  }]},
  {
    path: '',
    component: AdminUserComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-user/admin-user.module#AdminUserModule'
  }]}
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
