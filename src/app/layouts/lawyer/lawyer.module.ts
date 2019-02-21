import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LawyerLayoutroutes } from './lawyer-routing';
import { LawyerDashboardComponent } from './lawyer-dashboard/lawyer-dashboard.component';
import { LawyerSerivesComponent } from './lawyer-serives/lawyer-serives.component';
import { AddLawyerComponent } from './add-lawyer/add-lawyer.component';
import {MatStepperModule} from '@angular/material/stepper';
// import { LawyerComponent } from './lawyer.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { LawyerProfileComponent } from './lawyer-profile/lawyer-profile.component';
import { LawyerConnectionsComponent } from './lawyer-connections/lawyer-connections.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModalModule, WavesModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md';
import { LawyerFiltersComponent } from './lawyer-filters/lawyer-filters.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxPaginationModule} from 'ngx-pagination';
import { SafeimgPipe } from './safeimg.pipe'; // <-- import the module

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LawyerLayoutroutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatStepperModule,
    Ng4LoadingSpinnerModule,
    MatProgressBarModule,
    NgxPaginationModule,
    ModalModule, WavesModule, InputsModule, ButtonsModule,MatButtonToggleModule
  ],
  declarations: [LawyerDashboardComponent, LawyerSerivesComponent, AddLawyerComponent, LawyerProfileComponent, LawyerConnectionsComponent, UserDetailsComponent, ChatUserComponent, LawyerFiltersComponent, SafeimgPipe]
})
export class LawyerModule { }
