import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//3rd party module
import { ImageCropperModule } from "ngx-img-cropper";
import { MentionModule } from 'angular-mentions/mention';

//components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { InternshipsComponent } from './components/internships/internships.component';
import { InternshipComponent } from './components/internship/internship.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyComponent } from './components/company/company.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { WifiComponent } from './components/wifi/wifi.component';
import { AccommodationComponent } from './components/accommodation/accommodation.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { JobOfferComponent } from './components/job-offer/job-offer.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SuicaComponent } from './components/suica/suica.component';
import { WeeklyReportsComponent } from './components/weekly-reports/weekly-reports.component';
import { InitAccountComponent } from './components/init-account/init-account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { InternshipOpeningComponent } from './components/company-profile/internship-opening/internship-opening.component';
import { OpeningsListComponent } from './components/company-profile/openings-list/openings-list.component';
import { CvBuilderComponent } from './components/cvbuilder/cvbuilder.component';
import { EducationComponent } from './components/cvbuilder/education/education.component';
import { ExperienceComponent } from './components/cvbuilder/experience/experience.component';
import { ProjectsComponent } from './components/cvbuilder/projects/projects.component';
import { OpeningListingComponent } from './components/opening-listing/opening-listing.component';

//services
import { ValidationService } from './services/validation/validation.service';
import { AuthService } from './services/auth/auth.service';
import { SitelinkApiService } from './services/sitelinkAPI/sitelink-api.service';
import { CompanyApiService } from './services/companyAPI/company-api.service';
import { InternshipApiService } from './services/internshipAPI/internship-api.service';
import { AutocompleteApiService } from './services/autocompleteAPI/autocomplete-api.service';

import { CvBuilderService } from './services/cvbuilder/cvbuilder.service';
import { CoreHttpService } from './services/core-http.service';

//guards
import { AuthGuard } from "./guards/auth.guard"

//custom directives
import { EqualValidatorDirective } from './directives/equal-validator.directive';
<<<<<<< HEAD
=======
import { CvBuilderComponent } from './components/cvbuilder/cvbuilder.component';
import { EducationComponent } from './components/cvbuilder/education/education.component';
import { ExperienceComponent } from './components/cvbuilder/experience/experience.component';
import { ProjectsComponent } from './components/cvbuilder/projects/projects.component';
>>>>>>> 3e6fa6b1616f4740ac554903c1a7415bd7e120d9
import { TexttransformPipe } from './pipe/texttransform.pipe';

const appRoutes: Routes =[
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'initAccount/:token', component: InitAccountComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'resetPassword/:token', component: ResetPasswordComponent},
  { path: 'verifyEmail/:token', component: VerifyEmailComponent},
  { path: 'internships', component: InternshipsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard]},
  { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard]},
  { path: 'findOpenings', component: OpeningListingComponent, canActivate: [AuthGuard]},
  { 
    path: 'companyProfile/:cmpId',
    component: CompanyProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'openingsList', pathMatch: 'full' },
      { path:'openingsList', component: OpeningsListComponent },
      { path:'opening/:openId', component: InternshipOpeningComponent }
    ]
  },
  {
   path: 'cvbuilder/:id', 
   component: CvBuilderComponent,
   canActivate: [AuthGuard],
   children: [
     { path: '', redirectTo: 'education', pathMatch: 'full' },
     { path: 'education', component: EducationComponent },
     { path: 'experience', component: ExperienceComponent },
     { path: 'projects', component: ProjectsComponent }
   ]
  },
  {
    path: 'internship/:id',
    component: InternshipComponent,
    canActivate: [AuthGuard],
    //canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'accommodation', pathMatch: 'full' },
      { path: 'wifi', component: WifiComponent},
      { path: 'accommodation', component: AccommodationComponent},
      { path: 'suica', component: SuicaComponent},
      { path: 'stipend', component: PaymentsComponent},
      { path: 'feedback', component: FeedbackComponent},
      { path: 'jobOffer', component: JobOfferComponent},
      { path: 'weeklyReports', component: WeeklyReportsComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InternshipsComponent,
    InternshipComponent,
    CompaniesComponent,
    CompanyComponent,
    DashboardComponent,
    ProfileComponent,
    PaymentsComponent,
    WifiComponent,
    AccommodationComponent,
    FeedbackComponent,
    JobOfferComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    SuicaComponent,
    WeeklyReportsComponent,
    EqualValidatorDirective,
    InitAccountComponent,
    ForgotPasswordComponent,
    CompanyProfileComponent,
    InternshipOpeningComponent,
    OpeningsListComponent,
    CvBuilderComponent,
    EducationComponent,
    ExperienceComponent,
    ProjectsComponent,
<<<<<<< HEAD
    TexttransformPipe,
    OpeningListingComponent
=======
    TexttransformPipe
>>>>>>> 3e6fa6b1616f4740ac554903c1a7415bd7e120d9
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(appRoutes),
    ImageCropperModule,
    MentionModule
  ],
  providers: [
    ValidationService,
    AuthService,
    AuthGuard,
    SitelinkApiService,
    CompanyApiService,
    InternshipApiService,
    AutocompleteApiService,
    CvBuilderService, // a service for cv builder to save and share data
    CoreHttpService  // a service for http calls. all http calls should use this
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
