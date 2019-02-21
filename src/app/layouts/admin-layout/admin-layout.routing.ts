import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminServicesComponent } from './admin-services/admin-services.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminServicesTypeComponent } from './admin-services-type/admin-services-type.component';
import { AdminAddServicesTypeComponent } from './admin-add-services-type/admin-add-services-type.component';

import { CategoryComponent } from './masters/category/category.component';
import { ServicesComponent } from './masters/services/services.component';
import { AccountComponent } from './masters/account/account.component';
import { BankComponent } from './masters/bank/bank.component';
import { DocumentTypeComponent } from './masters/document-type/document-type.component';
import { PaymentTypeComponent } from './masters/payment-type/payment-type.component';
import { ServiceTypeComponent } from './masters/service-type/service-type.component';
import { AccountAddComponent } from './masters/account-add/account-add.component';
import { BankAddComponent } from './masters/bank-add/bank-add.component';
import { CategoryAddComponent } from './masters/category-add/category-add.component';
import { ServiceAddComponent } from './masters/service-add/service-add.component';
import { DocumentTypeAddComponent } from './masters/document-type-add/document-type-add.component';
import { PaymentTypeAddComponent } from './masters/payment-type-add/payment-type-add.component';
import { ServiceTypeAddComponent } from './masters/service-type-add/service-type-add.component';
import { ConnectionsComponent } from './connections/connections.component';
import { ConnectionDetailsComponent } from './connection-details/connection-details.component';
import { LawyersComponent } from './lawyers/lawyers.component';
import { LawyersDetailsComponent } from './lawyers-details/lawyers-details.component';
import { MastersPageComponent } from './masters-page/masters-page.component';

export const AdminLayoutRoutes: Routes = [
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
    // { path: 'maps',           component: MapsComponent },
    { path: 'addservice',           component: AddAdminComponent },
    { path: 'addservice-type',           component: AdminAddServicesTypeComponent },
    { path: 'dashboard',      component: AdminDashboardComponent },
    // { path: 'profile',   component: UserProfileComponent },
    
    { path: 'account',     component: AccountComponent },
    { path: 'account-add',     component: AccountAddComponent },
    { path: 'bank',     component: BankComponent },
    { path: 'bank-add',     component: BankAddComponent },
    { path: 'category',     component: CategoryComponent },
    { path: 'category-add',          component: CategoryAddComponent },
    { path: 'services',     component: ServicesComponent },
    { path: 'service-add',     component: ServiceAddComponent },
    { path: 'document-type',     component: DocumentTypeComponent },
    { path: 'document-type-add',     component: DocumentTypeAddComponent },
    { path: 'payment-type',     component: PaymentTypeComponent },
    { path: 'payment-type-add',     component: PaymentTypeAddComponent },
    { path: 'service-type',     component: ServiceTypeComponent },
    { path: 'service-type-add',     component: ServiceTypeAddComponent },
    { path: 'connections',     component: ConnectionsComponent },
    { path: 'connections-details',     component: ConnectionDetailsComponent },
    { path: 'lawyers',     component: LawyersComponent },
    { path: 'lawyers-details',     component: LawyersDetailsComponent },
    { path: 'masters-page',     component: MastersPageComponent },

    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
