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
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyComponent } from './components/company/company.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
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
import { InterestsComponent } from './components/cvbuilder/interests/interests.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { TAndCComponent } from './components/t-and-c/t-and-c.component';
import { CandiLandngComponent } from './components/candi-landng/candi-landng.component';
import { CmpLandngComponent } from './components/cmp-landng/cmp-landng.component';
import { CnadiShrtlstComponent } from './components/cnadi-shrtlst/cnadi-shrtlst.component';

//services
import { ValidationService } from './services/validation/validation.service';
import { AuthService } from './services/auth/auth.service';
import { SitelinkApiService } from './services/sitelinkAPI/sitelink-api.service';
import { CompanyApiService } from './services/companyAPI/company-api.service';
import { AutocompleteApiService } from './services/autocompleteAPI/autocomplete-api.service';
import { CoreHttpService } from './services/core-http.service';

//guards
import { AuthGuard } from "./guards/auth.guard"

//custom directives
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { TexttransformPipe } from './pipe/texttransform.pipe';
import { SkillsComponent } from './components/cvbuilder/skills/skills.component';
import { CertificationComponent } from './components/cvbuilder/certification/certification.component';
import { SafePipe } from './pipe/safe.pipe';

const appRoutes: Routes =[
  { path: '', redirectTo: 'candidateLanding', pathMatch: 'full'},
  { path: 'candidateLanding', component: CandiLandngComponent, pathMatch: 'full'},
  { path: 'companyLanding', component: CmpLandngComponent, pathMatch: 'full'},
  { path: 'initAccount/:token', component: InitAccountComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'tandc', component: TAndCComponent},
  { path: 'resetPassword/:token', component: ResetPasswordComponent},
  { path: 'verifyEmail/:token', component: VerifyEmailComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'company/:id', component: CompanyComponent, canActivate: [AuthGuard]},
  { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard]},
  { path: 'findOpenings', component: OpeningListingComponent, canActivate: [AuthGuard]},
  { path: 'candidates', component: CandidatesComponent, canActivate: [AuthGuard]},
  { path: 'shortlist', component: CnadiShrtlstComponent, canActivate: [AuthGuard]},
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
     { path: 'projects', component: ProjectsComponent },
     { path: 'skills', component: SkillsComponent},
     { path: 'cert', component: CertificationComponent},
     { path: 'interests', component: InterestsComponent}
   ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CompaniesComponent,
    CompanyComponent,
    ProfileComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
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
    TexttransformPipe,
    OpeningListingComponent,
    SkillsComponent,
    CertificationComponent,
    SafePipe,
    InterestsComponent,
    CandidatesComponent,
    TAndCComponent,
    CandiLandngComponent,
    CmpLandngComponent,
    CnadiShrtlstComponent
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
    AutocompleteApiService,
    CoreHttpService  // a service for http calls. all http calls should use this
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
