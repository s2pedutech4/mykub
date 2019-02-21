// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
// import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule,MatFormFieldModule, MatAutocompleteModule, MatInputModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
// MDB Angular Free
import { ModalModule, WavesModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AdminUserComponent } from './layouts/admin-user/admin-user.component';
import {MatStepperModule} from '@angular/material/stepper';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { StorageServiceModule} from 'angular-webstorage-service';
import {
  AgmCoreModule
} from '@agm/core';
import { MatTabsModule } from '@angular/material';
import { NgChatModule } from 'ng-chat';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewNavbarComponent } from './new-navbar/new-navbar.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChatComponent } from './chat/chat.component';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './alert.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LawyerComponent } from './layouts/lawyer/lawyer.component';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { StarRatingModule } from 'angular-star-rating';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(), WavesModule, InputsModule, ButtonsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule, MatAutocompleteModule, MatInputModule,
    FlexLayoutModule,
    NgChatModule,
    ComponentsModule,
    // AdminLayoutModule,
    StorageServiceModule,
    MatCardModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    ChatModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
       apiKey: 'AIzaSyDfakKA3ZoyTGjee0GZ68rklsK0lT6ska0',
      //apiKey: 'AIzaSyC9vfNOYPOdLo1O3HpllHSwUzDlbmvD72E',
      libraries: ['places']

    })
  ],
  declarations: [
    AppComponent,
    MapsComponent,
    AdminLayoutComponent,
    AdminUserComponent,
    StartComponent,
    LoginComponent,
    SignupComponent,
    NewNavbarComponent,
    ProfilePageComponent,
    ChatComponent,
    LawyerComponent,
    DialogOverviewExampleDialogComponent,
    OtpComponent
  ],
  providers: [AlertService],
  entryComponents: [DialogOverviewExampleDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
