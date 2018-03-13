import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
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

const appRoutes: Routes =[
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'internships', component: InternshipsComponent, pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'companies', component: CompaniesComponent},
  {
    path: 'internship',
    component: InternshipComponent,
    pathMatch: 'full',
    children: [
      {path: 'wifi', component: WifiComponent},
      {path: 'accommodation', component: AccommodationComponent},
      {path: 'suica', component: SuicaComponent},
      {path: 'payments', component: PaymentsComponent},
      {path: 'feedback', component: FeedbackComponent},
      {path: 'jobOffer', component: JobOfferComponent},
      {path: 'weeklyReports', component: WeeklyReportsComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
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
    WeeklyReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
