import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, WavesModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md';
// import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserLayoutRoutes } from './admin-user.routing';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatAutocompleteModule
} from '@angular/material';
import { FindLawyersComponent } from './find-lawyers/find-lawyers.component';
import { BottomSheet } from './find-lawyers/find-lawyers.component';
import { ConnectionsComponent } from './connections/connections.component';
import { LawyerDetailsComponent } from './lawyer-details/lawyer-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChatLawyerComponent } from './chat-lawyer/chat-lawyer.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaymentComponent } from './payment/payment.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { StarRatingModule } from 'angular-star-rating';
import { SafePipe } from './safe.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { NotifyComponent } from './notify/notify.component';
// import { ComponentsModule } from '../../components/components.module';
import {MatListModule} from '@angular/material/list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    Ng4LoadingSpinnerModule.forRoot(),
    StarRatingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatBottomSheetModule,
    ModalModule, WavesModule, InputsModule, ButtonsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    NgbModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatListModule
  ],
  declarations: [UserDashboardComponent, UserServicesComponent, AddUserComponent, UserSidebarComponent, FindLawyersComponent, ConnectionsComponent, LawyerDetailsComponent, ChatLawyerComponent, PaymentComponent, SafePipe, UserProfileComponent, ChangePassComponent, NotifyComponent,BottomSheet],
  entryComponents: [BottomSheet],



})
export class AdminUserModule { }
