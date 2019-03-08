import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawyerDashboardComponent } from './lawyer-dashboard/lawyer-dashboard.component';
import { LawyerSerivesComponent } from './lawyer-serives/lawyer-serives.component';
import { AddLawyerComponent } from './add-lawyer/add-lawyer.component';
import { LawyerProfileComponent } from './lawyer-profile/lawyer-profile.component';
import { LawyerConnectionsComponent } from './lawyer-connections/lawyer-connections.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { LawyerFiltersComponent } from './lawyer-filters/lawyer-filters.component';
import { ChangePassComponent } from './change-pass/change-pass.component'; // <-- import the module

export const LawyerLayoutroutes: Routes = [ 
{ path: 'add-lawyer-service',           component: AddLawyerComponent },
{ path: 'lawyer-dashboard',      component: LawyerDashboardComponent },
{ path: 'lawyer-profile',   component: LawyerProfileComponent },
{ path: 'lawyer-service',     component: LawyerSerivesComponent },
{ path: 'connections-users',     component: LawyerConnectionsComponent },
{ path: 'user-details',     component: UserDetailsComponent },
{ path: 'chat-user',     component: ChatUserComponent },
{ path: 'lawyer-change-pass',     component: ChangePassComponent },
// { path: 'lawyer-change-pass',     component: ChangePassComponent }
// { path: 'icons',          component: IconsComponent },
// { path: 'notifications',  component: NotificationsComponent },
// { path: 'upgrade',        component: UpgradeComponent },
];

// @NgModule({
//   imports: [RouterModule.forChild(LawyerLayoutroutes)],
//   exports: [RouterModule]
// })
 