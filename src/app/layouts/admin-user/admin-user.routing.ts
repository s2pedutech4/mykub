import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FindLawyersComponent } from './find-lawyers/find-lawyers.component';
import { ConnectionsComponent } from './connections/connections.component';
import { LawyerDetailsComponent } from './lawyer-details/lawyer-details.component';
import { ChatLawyerComponent } from './chat-lawyer/chat-lawyer.component';
import { PaymentComponent } from './payment/payment.component';

export const UserLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'chat-lawyer',           component: ChatLawyerComponent },
    { path: 'add-user-service',           component: AddUserComponent },
    { path: 'user-dashboard',      component: UserDashboardComponent },
    { path: 'lawyer-details',   component: LawyerDetailsComponent },
    { path: 'user-service',     component: UserServicesComponent },
    { path: 'find-lawyers',     component: FindLawyersComponent },
    { path: 'connections-lawyers',     component: ConnectionsComponent },  
    { path: 'payment-lawyer',     component: PaymentComponent },      
    
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
