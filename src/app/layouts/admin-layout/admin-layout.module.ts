import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
// import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule

} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminServicesComponent } from './admin-services/admin-services.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminServicesTypeComponent } from './admin-services-type/admin-services-type.component';
import { AdminAddServicesTypeComponent } from './admin-add-services-type/admin-add-services-type.component';
import { CategoryComponent } from './masters/category/category.component';
import { ServicesComponent } from './masters/services/services.component';
import { AccountComponent } from './masters/account/account.component';
import { BankComponent } from './masters/bank/bank.component';
import { DocumentTypeComponent } from './masters/document-type/document-type.component';
import { PaymentTypeComponent } from './masters/payment-type/payment-type.component';
import { AccountAddComponent } from './masters/account-add/account-add.component';
import { BankAddComponent } from './masters/bank-add/bank-add.component';
import { CategoryAddComponent } from './masters/category-add/category-add.component';
import { ServiceAddComponent } from './masters/service-add/service-add.component';
import { DocumentTypeAddComponent } from './masters/document-type-add/document-type-add.component';
import { PaymentTypeAddComponent } from './masters/payment-type-add/payment-type-add.component';
import { ServiceTypeAddComponent } from './masters/service-type-add/service-type-add.component';
import { ServiceTypeComponent } from './masters/service-type/service-type.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ConnectionsComponent } from './connections/connections.component';
import { ConnectionDetailsComponent } from './connection-details/connection-details.component';
import { LawyersComponent } from './lawyers/lawyers.component';
import { LawyersDetailsComponent } from './lawyers-details/lawyers-details.component';
import { MastersPageComponent } from './masters-page/masters-page.component';
import { CourtComponent } from './masters/court/court.component';
import { AdminpipePipe } from './adminpipe.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    Ng4LoadingSpinnerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatStepperModule,
    MatCheckboxModule,
    NgxPaginationModule,
    MatSnackBarModule
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    // MapsComponent,
    // NotificationsComponent,
    UpgradeComponent,
    AdminDashboardComponent,
    AdminServicesComponent,
    AddAdminComponent,
    AdminSidebarComponent,
    AdminServicesTypeComponent,
    AdminAddServicesTypeComponent,
    CategoryComponent,
    ServicesComponent,
    AccountComponent,
    BankComponent,
    DocumentTypeComponent,
    PaymentTypeComponent,
    AccountAddComponent,
    BankAddComponent,
    CategoryAddComponent,
    ServiceAddComponent,
    DocumentTypeAddComponent,
    PaymentTypeAddComponent,
    ServiceTypeAddComponent,
    ServiceTypeComponent,
    ConnectionsComponent,
    ConnectionDetailsComponent,
    LawyersComponent,
    LawyersDetailsComponent,
    MastersPageComponent,
    CourtComponent,
    AdminpipePipe,
    // NotificationsComponent
  ],
  exports: [
    AddAdminComponent
  ]
})

export class AdminLayoutModule {

}
