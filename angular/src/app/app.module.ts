import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';

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

const appRoutes: Routes =[
  {},
  {},
  {},
  {},
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
    JobOfferComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
