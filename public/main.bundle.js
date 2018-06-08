webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "footer{\r\n    background-color: #2a9e5a\r\n}\r\n\r\nfooter{\r\n    margin-top: 100px;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<header><app-header></app-header></header>\n<main>\n  <div class=\"container\">\n      <router-outlet></router-outlet>\n  </div>\n</main>\n<footer class=\"page-footer\"><app-footer></app-footer></footer>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_img_cropper__ = __webpack_require__("./node_modules/ngx-img-cropper/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_header_header_component__ = __webpack_require__("./src/app/components/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_footer_footer_component__ = __webpack_require__("./src/app/components/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__ = __webpack_require__("./src/app/components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_internships_internships_component__ = __webpack_require__("./src/app/components/internships/internships.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_internship_internship_component__ = __webpack_require__("./src/app/components/internship/internship.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_companies_companies_component__ = __webpack_require__("./src/app/components/companies/companies.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_company_company_component__ = __webpack_require__("./src/app/components/company/company.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_dashboard_dashboard_component__ = __webpack_require__("./src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_profile_profile_component__ = __webpack_require__("./src/app/components/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_payments_payments_component__ = __webpack_require__("./src/app/components/payments/payments.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_wifi_wifi_component__ = __webpack_require__("./src/app/components/wifi/wifi.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_accommodation_accommodation_component__ = __webpack_require__("./src/app/components/accommodation/accommodation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_feedback_feedback_component__ = __webpack_require__("./src/app/components/feedback/feedback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_job_offer_job_offer_component__ = __webpack_require__("./src/app/components/job-offer/job-offer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_reset_password_reset_password_component__ = __webpack_require__("./src/app/components/reset-password/reset-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_verify_email_verify_email_component__ = __webpack_require__("./src/app/components/verify-email/verify-email.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_suica_suica_component__ = __webpack_require__("./src/app/components/suica/suica.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_weekly_reports_weekly_reports_component__ = __webpack_require__("./src/app/components/weekly-reports/weekly-reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_init_account_init_account_component__ = __webpack_require__("./src/app/components/init-account/init-account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_validation_validation_service__ = __webpack_require__("./src/app/services/validation/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_sitelinkAPI_sitelink_api_service__ = __webpack_require__("./src/app/services/sitelinkAPI/sitelink-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_companyAPI_company_api_service__ = __webpack_require__("./src/app/services/companyAPI/company-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_internshipAPI_internship_api_service__ = __webpack_require__("./src/app/services/internshipAPI/internship-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_autocompleteAPI_autocomplete_api_service__ = __webpack_require__("./src/app/services/autocompleteAPI/autocomplete-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__guards_auth_guard__ = __webpack_require__("./src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__directives_equal_validator_directive__ = __webpack_require__("./src/app/directives/equal-validator.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







//3rd party module

//components



















//services






//guards

//directives

var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__["a" /* HomeComponent */], pathMatch: 'full' },
    { path: 'initAccount/:token', component: __WEBPACK_IMPORTED_MODULE_26__components_init_account_init_account_component__["a" /* InitAccountComponent */] },
    { path: 'resetPassword/:token', component: __WEBPACK_IMPORTED_MODULE_22__components_reset_password_reset_password_component__["a" /* ResetPasswordComponent */] },
    { path: 'verifyEmail/:token', component: __WEBPACK_IMPORTED_MODULE_23__components_verify_email_verify_email_component__["a" /* VerifyEmailComponent */] },
    { path: 'internships', component: __WEBPACK_IMPORTED_MODULE_11__components_internships_internships_component__["a" /* InternshipsComponent */], pathMatch: 'full', canActivate: [__WEBPACK_IMPORTED_MODULE_33__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_15__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_33__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_16__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_33__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'company', component: __WEBPACK_IMPORTED_MODULE_14__components_company_company_component__["a" /* CompanyComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_33__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'companies', component: __WEBPACK_IMPORTED_MODULE_13__components_companies_companies_component__["a" /* CompaniesComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_33__guards_auth_guard__["a" /* AuthGuard */]] },
    {
        path: 'internship/:id',
        component: __WEBPACK_IMPORTED_MODULE_12__components_internship_internship_component__["a" /* InternshipComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_33__guards_auth_guard__["a" /* AuthGuard */]],
        //canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'accommodation', pathMatch: 'full' },
            { path: 'wifi', component: __WEBPACK_IMPORTED_MODULE_18__components_wifi_wifi_component__["a" /* WifiComponent */] },
            { path: 'accommodation', component: __WEBPACK_IMPORTED_MODULE_19__components_accommodation_accommodation_component__["a" /* AccommodationComponent */] },
            { path: 'suica', component: __WEBPACK_IMPORTED_MODULE_24__components_suica_suica_component__["a" /* SuicaComponent */] },
            { path: 'stipend', component: __WEBPACK_IMPORTED_MODULE_17__components_payments_payments_component__["a" /* PaymentsComponent */] },
            { path: 'feedback', component: __WEBPACK_IMPORTED_MODULE_20__components_feedback_feedback_component__["a" /* FeedbackComponent */] },
            { path: 'jobOffer', component: __WEBPACK_IMPORTED_MODULE_21__components_job_offer_job_offer_component__["a" /* JobOfferComponent */] },
            { path: 'weeklyReports', component: __WEBPACK_IMPORTED_MODULE_25__components_weekly_reports_weekly_reports_component__["a" /* WeeklyReportsComponent */] }
        ]
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_internships_internships_component__["a" /* InternshipsComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_internship_internship_component__["a" /* InternshipComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_companies_companies_component__["a" /* CompaniesComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_company_company_component__["a" /* CompanyComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_payments_payments_component__["a" /* PaymentsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_wifi_wifi_component__["a" /* WifiComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_accommodation_accommodation_component__["a" /* AccommodationComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_feedback_feedback_component__["a" /* FeedbackComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_job_offer_job_offer_component__["a" /* JobOfferComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_reset_password_reset_password_component__["a" /* ResetPasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_verify_email_verify_email_component__["a" /* VerifyEmailComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_suica_suica_component__["a" /* SuicaComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_weekly_reports_weekly_reports_component__["a" /* WeeklyReportsComponent */],
                __WEBPACK_IMPORTED_MODULE_34__directives_equal_validator_directive__["a" /* EqualValidatorDirective */],
                __WEBPACK_IMPORTED_MODULE_26__components_init_account_init_account_component__["a" /* InitAccountComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["a" /* MaterializeModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* RouterModule */].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_7_ngx_img_cropper__["c" /* ImageCropperModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_27__services_validation_validation_service__["a" /* ValidationService */],
                __WEBPACK_IMPORTED_MODULE_28__services_auth_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_33__guards_auth_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_29__services_sitelinkAPI_sitelink_api_service__["a" /* SitelinkApiService */],
                __WEBPACK_IMPORTED_MODULE_30__services_companyAPI_company_api_service__["a" /* CompanyApiService */],
                __WEBPACK_IMPORTED_MODULE_31__services_internshipAPI_internship_api_service__["a" /* InternshipApiService */],
                __WEBPACK_IMPORTED_MODULE_32__services_autocompleteAPI_autocomplete_api_service__["a" /* AutocompleteApiService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/accommodation/accommodation.component.css":
/***/ (function(module, exports) {

module.exports = ".fltBtnArea{\r\n    position: relative;\r\n}\r\n\r\n#acmdationInfoEditBtn {\r\n    position: absolute;\r\n    right: 2%;\r\n    bottom: 0%;\r\n    -webkit-transform: translateY(+50%);\r\n            transform: translateY(+50%);\r\n}\r\n\r\n#acmdationInfoFormActions{\r\n    text-align: center;\r\n}"

/***/ }),

/***/ "./src/app/components/accommodation/accommodation.component.html":
/***/ (function(module, exports) {

module.exports = "<form (submit)=\"upsertAcmdationInfo(AcmdationForm.valid)\" #AcmdationForm=ngForm>\n  <div class=\"row\">\n    <div *ngIf= 'isWLMember' class=\"input-field col s12\">\n      <label for=\"cost\">accommodation cost</label>\n      <input id=\"cost\" name='cost' type=\"number\" [(ngModel)]=\"acmdationInfo.cost\" required [disabled]=\"!editingAcmdationInfo\" #cost=\"ngModel\">\n      <div [hidden]= \"cost.valid || (cost.pristine && !AcmdationForm.submitted) || !editingAcmdationInfo\" class=\"red-text\">\n        Please input a valid cost.\n      </div>\n    </div>\n    <div class=\"input-field col s12\">\n      <label for=\"address\">Address</label>\n      <input id=\"address\" name='address' type=\"text\" [(ngModel)]=\"acmdationInfo.address\" required [disabled]=\"!editingAcmdationInfo\" #address=\"ngModel\">\n      <div [hidden]= \"address.valid || (address.pristine && !AcmdationForm.submitted) || !editingAcmdationInfo\" class=\"red-text\">\n        Please input a valid address.\n      </div>\n    </div>\n    <div class=\"input-field col s12\">\n        <label for=\"agName\">Agency name</label>\n        <input id=\"agName\" name='name' type=\"text\" [(ngModel)]=\"acmdationInfo.agency.name\" [disabled]=\"!editingAcmdationInfo\">\n      </div>\n      <div class=\"input-field col s12\">\n        <label for=\"agEmail\">Agency contact email address</label>\n        <input id=\"agEmail\" name='email' type=\"text\" [(ngModel)]=\"acmdationInfo.agency.email\" [disabled]=\"!editingAcmdationInfo\">\n      </div>\n      <div class=\"input-field col s12\">\n        <label for=\"agPhNum\">Agency contact number</label>\n        <input id=\"agPhNum\" name='phNum' type=\"text\" [(ngModel)]=\"acmdationInfo.agency.phNum\" [disabled]=\"!editingAcmdationInfo\">\n      </div>\n      <div class=\"input-field col s6\">\n        <label for=\"mIn\" class=\"active\">Move in date</label>\n        <input id=\"mIn\" type=\"text\" name=\"mIn\" [(ngModel)]=\"acmdationInfo.mIn\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 20, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\" [disabled]=\"!editingAcmdationInfo\">\n      </div>\n      <div class=\"input-field col s6\">\n        <label for=\"mOut\" class=\"active\">Move out date</label>\n        <input id=\"mOut\" type=\"text\" name=\"mOut\" [(ngModel)]=\"acmdationInfo.mOut\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 20, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\" [disabled]=\"!editingAcmdationInfo\">\n      </div>\n      <div *ngIf= 'isWLMember' class=\"input-field col s12\">\n        <label for=\"cmnts\">additional remarks/comments</label>\n        <textarea id=\"cmnts\" class=\"materialize-textarea\" name='cmnts' [(ngModel)]=\"acmdationInfo.cmnts\" [disabled]=\"!editingAcmdationInfo\"></textarea>\n      </div>\n      <div class=\"col s12\" id=\"acmdationInfoFormActions\" [hidden]=\"!editingAcmdationInfo\">\n        <button type=\"submit\" class=\"btn btn-submit\">Save<i class=\"material-icons right\">send</i></button>\n        <button type=\"button\" (click)=\"editingAcmdationInfo = false\" class=\"btn red\">Cancel</button>\n      </div>\n  </div>\n</form>\n<div [hidden]=\"editingAcmdationInfo\" class=\"fltBtnArea\">\n  <a *ngIf='isWLMember' id=\"acmdationInfoEditBtn\" (click)=\"editingAcmdationInfo = true\" class=\"btn-floating btn-large waves-effect waves-light red\" ><i class=\"material-icons\">edit</i></a>\n</div>"

/***/ }),

/***/ "./src/app/components/accommodation/accommodation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccommodationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__ = __webpack_require__("./src/app/services/internshipAPI/internship-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AccommodationComponent = /** @class */ (function () {
    function AccommodationComponent(route, intnshpService) {
        this.route = route;
        this.intnshpService = intnshpService;
        this.editingAcmdationInfo = false;
        this.isWLMember = true;
        this.acmdationInfo = { cost: '', address: '', agency: { name: '', email: '', phNum: '' }, mIn: '', mOut: '', cmnts: '' };
    }
    AccommodationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.intnshpId = this.route.parent.snapshot.paramMap.get('id');
        this.intnshpService.loadAccommodationDetails(this.intnshpId).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Some error occurred, please try again later.");
            }
            if (!resp.accommodation.hasOwnProperty('cost')) {
                resp.accommodation['cost'] = 0;
                resp.accommodation['cmnts'] = '';
                _this.isWLMember = false;
            }
            _this.acmdationInfo = resp.accommodation;
            setTimeout(function () {
                Materialize.updateTextFields();
            });
        });
    };
    AccommodationComponent.prototype.upsertAcmdationInfo = function (isValidForm) {
        var _this = this;
        if (!isValidForm)
            return false;
        this.intnshpService.upsertAccommodationDetails(this.intnshpId, this.acmdationInfo).subscribe(function (resp) {
            if (!resp.success) {
                console.log(resp.error);
                return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("some error occurred, please try agin later.", 3000);
            }
            _this.acmdationInfo = resp.accommodation;
            _this.editingAcmdationInfo = false;
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Information updated successfully.", 3000);
            setTimeout(function () {
                Materialize.updateTextFields();
            });
        });
    };
    AccommodationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-accommodation',
            template: __webpack_require__("./src/app/components/accommodation/accommodation.component.html"),
            styles: [__webpack_require__("./src/app/components/accommodation/accommodation.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__["a" /* InternshipApiService */]])
    ], AccommodationComponent);
    return AccommodationComponent;
}());



/***/ }),

/***/ "./src/app/components/companies/companies.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/companies/companies.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12\">\n    <div class=\"input-field\">\n      <i class=\"material-icons prefix\">search</i>\n      <input type=\"text\" id=\"autocomplete-input\" class=\"autocomplete\" materialize=\"autocomplete\" [materializeParams]=\"autocompleteParams\" [materializeActions]=\"autocompleteActions\">\n      <label for=\"autocomplete-input\">Company Name</label>\n    </div>\n    <div id=\"paginationArea\">\n    </div>\n  </div>\n</div>\n<a id=\"addCompanyBtn\" class=\"btn-floating btn-large waves-effect waves-light red modal-trigger\" href=\"#createCmpModal\"><i class=\"material-icons\">add</i></a>\n\n<div id=\"createCmpModal\" class=\"modal modal-fixed-footer\" materialize=\"modal\" [materializeActions]=\"modalActions\">\n  <div class=\"modal-content\">\n    <div class=\"container\">\n      <h3>Create a company</h3>\n      <form (submit)=\"cmpCreateSubmit(form.valid)\" #form=ngForm>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <input id=\"name\" name=\"name\" [(ngModel)]=\"newCmp.name\" type=\"text\" #name=\"ngModel\" required>\n            <label for=\"name\" class=\"active\">Name</label>\n            <div [hidden]= \"name.valid || (name.pristine && !form.submitted)\" class=\"red-text\">\n              Please input a valid company name.\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field col s6\">\n            <label for=\"adminName\" class=\"active\">Admin Name</label>\n            <input type=\"text\" [(ngModel)]=\"newCmp.admin.adminName\" name=\"adminName\" id=\"adminName\" #adminName=\"ngModel\" required>\n            <div [hidden]= \"adminName.valid || (adminName.pristine && !form.submitted)\" class=\"red-text\">\n              Please input a valid admin name.\n            </div>\n          </div>\n          <div class=\"input-field col s6\">\n            <label for=\"adminEmail\" class=\"active\">Admin Email</label>\n            <input type=\"email\" [(ngModel)]=\"newCmp.admin.adminEmail\" name=\"adminEmail\" id=\"adminEmail\" #adminEmail=\"ngModel\" required>\n            <div [hidden]= \"adminEmail.valid || (adminEmail.pristine && !form.submitted)\" class=\"red-text\">\n              Please input a valid email address.\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <input id=\"address\" type=\"text\" name=\"address\" [(ngModel)]=\"newCmp.address\">\n            <label for=\"address\" class=\"active\">Address</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <input id=\"est\" type=\"text\" name=\"est\" [(ngModel)]=\"newCmp.est\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 100, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n            <label for=\"est\" class=\"active\">Established</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <label for=\"phNum\" class=\"active\">Phone Number</label>\n            <input type=\"text\" [(ngModel)]=\"newCmp.phNum\" name=\"phNum\" id=\"phNum\">\n          </div>\n        </div>\n        <button type=\"submit\" class=\"btn btn-submit\">Save<i class=\"material-icons right\">send</i></button>\n      </form>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <a class=\"modal-action modal-close waves-effect waves-green btn-flat \">Cancel</a>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/companies/companies.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompaniesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_companyAPI_company_api_service__ = __webpack_require__("./src/app/services/companyAPI/company-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { DatePipe } from '@angular/common';



var CompaniesComponent = /** @class */ (function () {
    function CompaniesComponent(companyAPIService, router) {
        this.companyAPIService = companyAPIService;
        this.router = router;
        this.autocompleteData = {};
        this.autocompleteActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.modalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autocompleteParams = [{ data: this.autocompleteData }];
        this.newCmp = { name: "", est: "", address: "", admin: { adminName: "", adminEmail: "" }, phNum: "" };
        this.newCmpMsg = "";
        this.loadedCmps = [];
    }
    CompaniesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyAPIService.getCmpNames().subscribe(function (resp) {
            if (!resp.success)
                return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Companies did not load, please try again later", 3000);
            _this.loadedCmps = resp.companies;
            var cmpLength = _this.loadedCmps.length;
            for (var i = 0; i < cmpLength; i++) {
                _this.autocompleteData[_this.loadedCmps[i].name] = null;
            }
            setTimeout(function () {
                _this.autocompleteActions.emit("autocomplete");
            });
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    CompaniesComponent.prototype.cmpCreateSubmit = function (formValid) {
        var _this = this;
        if (!formValid)
            return false;
        this.companyAPIService.createCompany(this.newCmp).subscribe(function (resp) {
            resp.success ? _this.newCmpMsg = "New company created successfully" : _this.newCmpMsg = "Some error occurred, please try agin later.";
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])(_this.newCmpMsg, 3000);
            _this.modalActions.emit({ action: "modal", params: ['close'] });
        });
    };
    CompaniesComponent.prototype.openCompanyPage = function () {
    };
    CompaniesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-companies',
            template: __webpack_require__("./src/app/components/companies/companies.component.html"),
            styles: [__webpack_require__("./src/app/components/companies/companies.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_companyAPI_company_api_service__["a" /* CompanyApiService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], CompaniesComponent);
    return CompaniesComponent;
}());



/***/ }),

/***/ "./src/app/components/company/company.component.css":
/***/ (function(module, exports) {

module.exports = "#infoEditBtn {\r\n    position: absolute;\r\n    right: 2%;\r\n    bottom: 0%;\r\n    -webkit-transform: translateY(+70%);\r\n            transform: translateY(+70%);\r\n}\r\n\r\n.rawInfo, .imgArea, #addAdminBtnArea{\r\n    position: relative;\r\n}\r\n\r\n.imgArea:hover img{\r\n    opacity:0.5;\r\n}\r\n\r\n.imgArea:hover a {\r\n    display: block;\r\n}\r\n\r\n.imgArea a {\r\n    position:absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    display:none;\r\n    -webkit-transform: translateY(-50%) translateX(-50%);\r\n            transform: translateY(-50%) translateX(-50%);\r\n}\r\n\r\nH3{\r\n    text-align: center;\r\n}\r\n\r\n.imgArea{\r\n    text-align: center;\r\n}\r\n\r\n#adminManagement{\r\n    margin-top: 60px;\r\n}\r\n\r\n#addAdminBtn{\r\n    position: absolute;\r\n    right: 2%;\r\n    bottom: 0%;\r\n    -webkit-transform: translateY(+70%);\r\n            transform: translateY(+70%);\r\n    margin-bottom: 30px;\r\n}\r\n\r\n#addAdminArea{\r\n    margin: 30px 0;\r\n}"

/***/ }),

/***/ "./src/app/components/company/company.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12 l6\" id=\"basicInfo\">\n    <h3>Basic Details</h3>\n    <div class=\"rawInfo\" [hidden]=\"editing\">\n      <div class=\"row\">\n        <div class=\"col s5\">Name:</div>\n        <div class=\"col s7\">{{companyDetails.name}}</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s5\">Address:</div>\n        <div class=\"col s7\">{{companyDetails.address}}</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s5\">Establishment date:</div>\n        <div class=\"col s7\">{{companyDetails.est | date:'longDate'}}</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s5\">Phone:</div>\n        <div class=\"col s7\">{{companyDetails.phNum}}</div>\n      </div>\n      <a id=\"infoEditBtn\" (click)=\"editInfoClick()\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">edit</i></a>\n    </div>\n    <div class=\"formArea\" [hidden]=\"!editing\">\n      <form (submit)=\"cmpInfoSubmit(form.valid)\" #form=ngForm>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <input id=\"name\" name=\"name\" [(ngModel)]=\"companyDetails.name\" type=\"text\" #name=\"ngModel\" required>\n            <label for=\"name\" class=\"active\">Name</label>\n            <div [hidden]= \"name.valid || (name.pristine && !form.submitted)\" class=\"red-text\">\n              Please input a Name.\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <input id=\"address\" type=\"text\" name=\"address\" [(ngModel)]=\"companyDetails.address\">\n            <label for=\"address\" class=\"active\">Address</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <input id=\"est\" type=\"text\" name=\"est\" [(ngModel)]=\"companyDetails.est\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 100, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n            <label for=\"est\" class=\"active\">Established</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <label for=\"phNum\" class=\"active\">Phone Number</label>\n            <input type=\"text\" [(ngModel)]=\"companyDetails.phNum\" name=\"phNum\" id=\"phNum\">\n          </div>\n        </div>\n        <button type=\"submit\" class=\"btn btn-submit\">Save<i class=\"material-icons right\">send</i></button>\n        <button type=\"button\" (click)='cancelInfoEditClick()' class=\"btn red\">cancel</button>\n      </form>\n    </div>\n  </div>\n  <div class=\"col s12 l6\" id=\"logo\">\n    <h3>Company Logo</h3>\n    <div class=\"imgArea\">\n      <img [src]=\"companyDetails.logo.url\" class=\"responsive-img circle\" alt=\"User display picture\">\n      <a href=\"#logoUploadModal\" class=\"btn-floating modal-trigger btn-large waves-effect waves-light red\"><i class=\"material-icons\">edit</i></a>\n    </div>\n  </div>\n</div>\n<div class=\"col s12\" id=\"adminManagement\">\n    <h3>Admins management</h3>\n    <div class=\"container\">\n      <table class=\"striped centered\">\n        <thead>\n          <tr>\n            <th>Index</th>\n            <th>Name</th>\n            <th>Email</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let admin of companyDetails.admins; let i = index\">\n            <td>{{i+1}}</td>\n            <td>{{admin.name}}</td>\n            <td>{{admin.email}}</td>\n          </tr>\n        </tbody>      \n      </table>\n      <div id=\"addAdminArea\">\n        <div id=\"addAdminBtnArea\" [hidden]=\"editingAdmin\">\n          <a (click)=\"addAdminClick()\" id=\"addAdminBtn\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">add</i></a>\n        </div>\n        <div id=\"addAdminForm\" [hidden]=\"!editingAdmin\">\n          <form (submit)=\"adminInfoSubmit(adminForm.valid)\" #adminForm=ngForm>\n            <div class=\"row\">\n              <div class=\"col s12 l6 input-field\">\n                <label for=\"adminName\">Name</label>\n                <input type=\"text\" name=\"name\" id=\"adminName\" [(ngModel)]=\"newAdmin.name\" required #name=\"ngModel\">\n                <div [hidden]= \"name.valid || (name.pristine && !adminForm.submitted)\" class=\"red-text\">\n                  Please input a name.\n                </div>\n              </div>\n              <div class=\"col s12 l6 input-field\">\n                <label for=\"adminEmail\">Email</label>\n                <input id=\"adminEmail\" type=\"email\" name=\"email\" [(ngModel)]=\"newAdmin.email\" #email=\"ngModel\" required pattern=\"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$\">\n                <div [hidden]= \"email.valid || (email.pristine && !adminForm.submitted)\" class=\"red-text\">\n                  Please input a valid Email address.\n                </div>\n              </div>\n            </div>\n            <button type=\"submit\" class=\"btn btn-submit\">Save<i class=\"material-icons right\">send</i></button>\n            <button type=\"button\" class=\"btn red\" (click)=\"cancelAdminEditClick()\">Cancel</button>\n          </form>\n        </div>\n      </div>\n    </div>\n</div>\n\n<div id=\"logoUploadModal\" class=\"modal modal-fixed-footer\" materialize=\"modal\">\n  <div class=\"modal-content\">\n    <img-cropper [image]=\"imgData\" [settings]=\"cropperSettings\" (onCrop)=\"cropped($event)\"></img-cropper>\n  </div>\n  <div class=\"modal-footer\">\n    <a (click)=\"onLogoUploadClick()\" class=\"modal-action modal-close waves-effect waves-green btn-flat\">Save</a>\n    <a class=\"modal-action modal-close waves-effect waves-green btn-flat\">Cancel</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/company/company.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_companyAPI_company_api_service__ = __webpack_require__("./src/app/services/companyAPI/company-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_img_cropper__ = __webpack_require__("./node_modules/ngx-img-cropper/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CompanyComponent = /** @class */ (function () {
    function CompanyComponent(companyAPIService, router) {
        this.companyAPIService = companyAPIService;
        this.router = router;
        this.editing = false;
        this.editingAdmin = false;
        this.companyDetails = { name: "", est: "", phNum: "", admins: [], address: '', logo: { key: "", url: "" } };
        this.newAdmin = {
            name: '',
            email: ''
        };
        this.cropperSettings = new __WEBPACK_IMPORTED_MODULE_4_ngx_img_cropper__["a" /* CropperSettings */]();
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.canvasWidth = 800;
        this.cropperSettings.canvasHeight = 450;
        this.cropperSettings.minWidth = 10;
        this.cropperSettings.minHeight = 10;
        this.cropperSettings.rounded = true;
        //this.cropperSettings.keepAspect = false;
        this.cropperSettings.dynamicSizing = true;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.imgData = {};
    }
    CompanyComponent.prototype.cropped = function (bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
    };
    CompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyAPIService.getCmpInfo().subscribe(function (resp) {
            if (!resp.success)
                return false;
            _this.companyDetails = resp.companyData;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    CompanyComponent.prototype.fileChangeListener = function ($event) {
        var image = new Image();
        var file = $event.target.files[0];
        var myReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
    };
    CompanyComponent.prototype.convertToBlob = function (base64Str) {
        var binary = atob(base64Str.split(',')[1]);
        var array = [];
        var mimeString = base64Str.split(',')[0].split(':')[1].split(';')[0];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: mimeString });
    };
    CompanyComponent.prototype.editInfoClick = function () {
        this.editing = true;
        Materialize.updateTextFields();
    };
    CompanyComponent.prototype.cancelInfoEditClick = function () {
        this.editing = false;
        Materialize.updateTextFields();
    };
    CompanyComponent.prototype.addAdminClick = function () {
        this.editingAdmin = true;
        Materialize.updateTextFields();
    };
    CompanyComponent.prototype.cancelAdminEditClick = function () {
        this.editingAdmin = false;
    };
    CompanyComponent.prototype.cmpInfoSubmit = function (validForm) {
        var _this = this;
        if (!validForm)
            return false;
        this.editing = false;
        this.companyAPIService.updateCmpInfo(this.companyDetails).subscribe(function (resp) {
            resp.success ? _this.companyInfoMsg = "Company information updated successfully." : _this.companyInfoMsg = "Some error occurred, please try agin later.";
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])(_this.companyInfoMsg, 3000);
        });
    };
    CompanyComponent.prototype.adminInfoSubmit = function (validForm) {
        var _this = this;
        if (!validForm)
            return false;
        this.editingAdmin = false;
        this.companyAPIService.addAdmin(this.newAdmin).subscribe(function (resp) {
            resp.success ? _this.companyInfoMsg = "New admin added successfully." : _this.companyInfoMsg = "Some error occurred, please try agin later.";
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])(_this.companyInfoMsg, 3000);
        });
    };
    CompanyComponent.prototype.onLogoUploadClick = function () {
        var _this = this;
        var formData = new FormData();
        var blob = this.convertToBlob(this.imgData.image);
        formData.append('companyLogo', blob);
        this.companyAPIService.updateLogo(formData).subscribe(function (resp) {
            if (resp.success) {
                _this.companyDetails.logo.url = resp.newLink;
                _this.logoMsg = "Company logo updated successfully.";
            }
            else {
                _this.logoMsg = "Some error occurred, please try agin later.";
            }
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])(_this.logoMsg, 3000);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('cropper', undefined),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ngx_img_cropper__["b" /* ImageCropperComponent */])
    ], CompanyComponent.prototype, "cropper", void 0);
    CompanyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-company',
            template: __webpack_require__("./src/app/components/company/company.component.html"),
            styles: [__webpack_require__("./src/app/components/company/company.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_companyAPI_company_api_service__["a" /* CompanyApiService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], CompanyComponent);
    return CompanyComponent;
}());



/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  dashboard works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/components/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/components/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/components/feedback/feedback.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/feedback/feedback.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  feedback works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/feedback/feedback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FeedbackComponent = /** @class */ (function () {
    function FeedbackComponent() {
    }
    FeedbackComponent.prototype.ngOnInit = function () {
    };
    FeedbackComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-feedback',
            template: __webpack_require__("./src/app/components/feedback/feedback.component.html"),
            styles: [__webpack_require__("./src/app/components/feedback/feedback.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FeedbackComponent);
    return FeedbackComponent;
}());



/***/ }),

/***/ "./src/app/components/footer/footer.component.css":
/***/ (function(module, exports) {

module.exports = ".cprtArea{\r\n    display: table;\r\n}\r\n\r\n#cprtTxt{\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n}\r\n\r\n.cprtArea img{\r\n    min-width: 80px;\r\n}\r\n\r\n.footer-copyright{\r\n    background: #209551;\r\n}"

/***/ }),

/***/ "./src/app/components/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col l6 s12\">\n      <iframe src=\"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpiits.jp%2F&tabs&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId\" width=\"340\" height=\"214\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>\n    </div>\n    <div class=\"col l4 offset-l2 s12\">\n      <ul>\n        <li><a class=\"grey-text text-lighten-3\" href=\"http://willings.co.jp/\">Willings, Inc.</a></li>\n        <li><a class=\"grey-text text-lighten-3\" href=\"http://piits.jp/faq\">FAQ</a></li>\n        <li><a class=\"grey-text text-lighten-3\" href=\"http://piits.jp/poricy\">Policy</a></li>\n        <li><a class=\"grey-text text-lighten-3\" href=\"https://willings.co.jp/contact\">Contact Us</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n<div class=\"footer-copyright\">\n  <div class=\"container cprtArea\">\n    <span id=\"cprtTxt\">© 2018 Willings, Inc. All rights reserved.</span>\n    <a class=\"right\" href=\"http://willings.co.jp/\"><img class=\"responsive-img\" src=\"../../assets/images/WL_logo_white.svg\" alt=\"Willings logo\"></a>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__("./src/app/components/footer/footer.component.html"),
            styles: [__webpack_require__("./src/app/components/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/components/header/header.component.css":
/***/ (function(module, exports) {

module.exports = "nav .nav-wrapper .brand-logo img {\r\n    height: 54px;\r\n    margin: 5px 0;\r\n}\r\n\r\n.dropdown-button img{\r\n    max-height: 54px;\r\n    margin: 5px 0;\r\n    vertical-align: middle;\r\n}\r\n\r\nnav{\r\n    background-color: #f3991e;\r\n    margin-bottom: 70px;\r\n}"

/***/ }),

/***/ "./src/app/components/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<ul id=\"dropdown1\" class=\"dropdown-content\">\n  <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/profile']\">Profile</a></li>\n  <li class=\"divider\"></li>\n  <li><a href=\"#\" (click)=\"logout()\">Logout</a></li>\n</ul>\n<ul id=\"dropdown2\" class=\"dropdown-content\">\n  <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/profile']\">Profile</a></li>\n  <li class=\"divider\"></li>\n  <li><a href=\"#\" (click)=\"logout()\">Logout</a></li>\n</ul>\n<nav>\n  <div class=\"container\">\n    <div class=\"nav-wrapper\">\n      <a href=\"\" class=\"brand-logo\"><img src=\"../../assets/images/piits_logo_white.png\" alt=\"Logo\"></a>\n      <a data-activates=\"mobile-demo\" class=\"button-collapse\" materialize=\"sideNav\"><i class=\"material-icons\">menu</i></a>\n      <ul class=\"right hide-on-med-and-down\">\n        <li *ngIf=\"authService.isLoggedIn() && userAccess != 2\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/dashboard']\" i18n>Dashboard</a></li>\n        <li *ngIf=\"authService.isLoggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/internships']\" i18n>Internships</a></li>\n        <li *ngIf=\"authService.isLoggedIn() && userAccess != 0\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/company']\" i18n>Company</a></li>\n        <li *ngIf=\"authService.isLoggedIn() && userAccess == 2\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/companies']\" i18n>Companies</a></li>\n        <li *ngIf=\"authService.isLoggedIn()\"><a class=\"dropdown-button\" data-activates=\"dropdown1\"\n          materialize =\"dropdown\" [materializeParams]=\"dropdownParams\" [materializeActions]=\"dropdownActions\">\n          <img [src]=\"user.DPUrl\" alt=\"Profile Pic\" id=\"headerDP\" class=\"left circle responsive-img\"><span>{{user.name}}</span><i class=\"material-icons right\">arrow_drop_down</i>\n        </a></li>\n      </ul>\n      <ul class=\"side-nav\" id=\"mobile-demo\">\n          <li *ngIf=\"authService.isLoggedIn()  && userAccess != 2\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/dashboard']\" >Dashboard</a></li>\n          <li *ngIf=\"authService.isLoggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/internships']\" >Internships</a></li>\n          <li *ngIf=\"authService.isLoggedIn() && userAccess != 0\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/company']\" >Company</a></li>\n          <li *ngIf=\"authService.isLoggedIn() && userAccess == 2\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/companies']\" >Companies</a></li>\n          <li *ngIf=\"authService.isLoggedIn()\"><a class=\"dropdown-button\" data-activates=\"dropdown2\" \n            materialize=\"dropdown\" [materializeParams]=\"dropdownParams\" [materializeActions]=\"dropdownActions\">\n            <img [src]=\"user.DPUrl\" alt=\"Profile Pic\" id=\"headerDP\" class=\"left circle responsive-img\"><span>{{user.name}}</span><i class=\"material-icons right\">arrow_drop_down</i>\n          </a></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/components/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["JwtHelper"]();
        this.user = {
            name: "",
            DPUrl: ""
        };
        this.dropdownActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.dropdownParams = [{ inDuration: 300, outDuration: 225, belowOrigin: true }];
        var token = localStorage.getItem('authToken');
        if (token) {
            this.decodedToken = this.jwtHelper.decodeToken(token);
            this.userAccess = this.decodedToken.access;
        }
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.loggedIn$.subscribe(function (headerData) {
            _this.user = headerData;
            setTimeout(function () {
                _this.dropdownActions.emit("dropdown");
            });
        });
        if (this.authService.isLoggedIn()) {
            this.authService.loadHeaderUserInfo();
        }
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.destroyToken();
        this.authService.destroyUserInfo();
        this.router.navigate(['/']);
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("./src/app/components/header/header.component.html"),
            styles: [__webpack_require__("./src/app/components/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/home/home.component.css":
/***/ (function(module, exports) {

module.exports = ".ng-valid[required], .ng-valid.required  {\r\n    border-bottom: 1px solid #42A948;\r\n    -webkit-box-shadow: 0 1px 0 0 #42A948;\r\n            box-shadow: 0 1px 0 0 #42A948;\r\n  }\r\n  \r\n  .ng-invalid:not(form)  {\r\n    border-bottom: 1px solid #a94442;\r\n    -webkit-box-shadow: 0 1px 0 0 #a94442;\r\n            box-shadow: 0 1px 0 0 #a94442;\r\n  }\r\n  \r\n  .container10p{\r\n    width: 100%;\r\n    padding: 0 10%;\r\n  }"

/***/ }),

/***/ "./src/app/components/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"loginFormArea col s12 l6 \">\n    <div class=\"container10p\">\n      <h3>Login</h3>\n      <div  [hidden]=\"!loginSubmitted\">\n        <div class=\"preloader-wrapper big active\">\n          <div class=\"spinner-layer spinner-blue-only\">\n            <div class=\"circle-clipper left\">\n              <div class=\"circle\"></div>\n            </div>\n            <div class=\"gap-patch\">\n              <div class=\"circle\"></div>\n            </div>\n            <div class=\"circle-clipper right\">\n              <div class=\"circle\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div [hidden]=\"loginSubmitted\">\n        <div [hidden]=\"!loginError\" class=\"red-text\">\n        {{loginMessage}}\n        </div>\n        <form class=\"col s12\" (submit)=\"onLoginUser(loginForm.valid)\" #loginForm=\"ngForm\">\n            <div class=\"row\">\n              <div class=\"input-field col s12\">\n                <label for=\"loginEmail\">Email</label>\n                <input id=\"loginEmail\" type=\"email\" name=\"loginEmail\" [(ngModel)]=\"loginUser.loginEmail\" #loginEmail=\"ngModel\" required pattern=\"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$\">\n                <div [hidden]= \"loginEmail.valid || (loginEmail.pristine && !loginForm.submitted)\" class=\"red-text\">\n                  Please input a valid Email address.\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"input-field col s12\">\n                <label for=\"loginPassword\">Password</label>\n                <input id=\"loginPassword\" name=\"loginPassword\" [(ngModel)]=\"loginUser.loginPassword\" type=\"password\" #loginPassword=\"ngModel\" required>\n                <div [hidden]= \"loginPassword.valid || (loginPassword.pristine && !loginForm.submitted)\" class=\"red-text\">\n                  Please input a Password.\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col s12\">\n                <button class=\"btn waves-effect waves-light\" type=\"submit\">Submit\n                  <i class=\"material-icons right\">send</i>\n                </button>\n              </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n  <div class=\"regFormArea col 12 l6 z-depth-2\">\n    <h3>Register</h3>\n    <div [hidden]=\"!regSubmitted\">\n      {{regMessage}}\n    </div>\n    <div [hidden]=\"regSubmitted\">\n      <form class=\"col s12\" (submit)=\"onRegisterUser(regForm.valid)\" #regForm=\"ngForm\">\n        <div class=\"form-group\">\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <input id=\"name\" name=\"name\" [(ngModel)]=\"registerUser.name\" type=\"text\" #name=\"ngModel\" required>\n              <label for=\"name\">Name</label>\n              <div [hidden]= \"name.valid || (name.pristine && !regForm.submitted)\" class=\"red-text\">\n                Please input a Name.\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <label for=\"email\">Email</label>\n              <input id=\"email\" type=\"email\" name=\"email\" [(ngModel)]=\"registerUser.email\" #email=\"ngModel\" required pattern=\"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$\">\n              <div [hidden]= \"email.valid || (email.pristine && !regForm.submitted)\" class=\"red-text\">\n                Please input a valid Email address.\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <input id=\"DOB\" type=\"text\" name=\"DOB\" [(ngModel)]=\"registerUser.DOB\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 100, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\" #DOB=\"ngModel\">\n              <label for=\"DOB\">Birth Date</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <input type=\"text\" [(ngModel)]=\"registerUser.phNum\" name=\"phNum\" id=\"phNum\" #phNum=\"ngModel\">\n              <label for=\"phNum\">Phone Number</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <label for=\"password\">Password</label>\n              <input id=\"password\" name=\"password\" [(ngModel)]=\"registerUser.password\" type=\"password\" #password=\"ngModel\"  required validateEqual=\"cnfPass\" reverse=\"true\">\n              <div [hidden]= \"password.valid || (password.pristine && !regForm.submitted)\" class=\"red-text\">\n                Please input a Password.\n              </div>\n            </div>\n            <div class=\"input-field col s6\">\n                <label for=\"cnfPass\">Confirm Password</label>\n                <input id=\"cnfPass\" name=\"cnfPass\" [(ngModel)]=\"registerUser.cnfPass\" type=\"password\" #cnfPass=\"ngModel\"  required validateEqual=\"password\" reverse=\"false\">\n                <div [hidden]= \"cnfPass.valid || (cnfPass.pristine && !regForm.submitted)\" class=\"red-text\">\n                  Passwords do not match.\n                </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col s12\">\n              <button class=\"btn waves-effect waves-light\" type=\"submit\">Submit\n                <i class=\"material-icons right\">send</i>\n              </button>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n  "

/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = /** @class */ (function () {
    function HomeComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.registerUser = {
            name: "",
            email: "",
            DOB: "",
            password: "",
            cnfPass: "",
            phNum: ""
        };
        this.loginUser = {
            loginEmail: "",
            loginPassword: ""
        };
        this.regSubmitted = false;
        this.loginSubmitted = false;
        this.loginError = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    };
    HomeComponent.prototype.onRegisterUser = function (validForm) {
        var _this = this;
        if (!validForm)
            return false;
        this.regSubmitted = true;
        var user = this.registerUser;
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success)
                _this.regMessage = "User Registered successfully and can now login";
            else
                _this.regMessage = "User registration failed. Please try agin later. If the error persists Please contact our support.";
        });
    };
    HomeComponent.prototype.onLoginUser = function (validForm) {
        var _this = this;
        if (!validForm)
            return false;
        this.loginSubmitted = true;
        var user = { email: this.loginUser.loginEmail, password: this.loginUser.loginPassword };
        this.authService.login(user).subscribe(function (data) {
            if (data.success) {
                _this.authService.loginSuccess(data);
                _this.router.navigate(['dashboard']);
            }
            else {
                _this.loginError = true;
                _this.loginMessage = data.message;
                _this.loginSubmitted = false;
            }
        });
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__("./src/app/components/home/home.component.html"),
            styles: [__webpack_require__("./src/app/components/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/init-account/init-account.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/init-account/init-account.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div *ngIf='validLink' class=\"col s12\">\n    <div class=\"container\">\n      <h3>Password setup</h3>\n      <form (submit)=\"passwordInitSubmit(form.valid)\" #form=ngForm>\n        <div class=\"input-field col s6\">\n          <label for=\"password\">Password</label>\n          <input id=\"password\" name=\"password\" [(ngModel)]=\"pass\" type=\"password\" #password=\"ngModel\"  required validateEqual=\"cnfPassword\" reverse=\"true\">\n          <div [hidden]= \"password.valid || (password.pristine && !form.submitted)\" class=\"red-text\">\n            Please input a Password.\n          </div>\n        </div>\n        <div class=\"input-field col s6\">\n          <label for=\"cnfPass\">Confirm Password</label>\n          <input id=\"cnfPass\" name=\"cnfPass\" [(ngModel)]=\"cnfPass\" type=\"password\" #cnfPassword=\"ngModel\"  required validateEqual=\"password\" reverse=\"false\">\n          <div [hidden]= \"cnfPassword.valid || (cnfPassword.pristine && !form.submitted)\" class=\"red-text\">\n            Passwords do not match.\n          </div>\n        </div>\n        <button type=\"submit\" class=\"btn btn-submit\">Setup password<i class=\"material-icons right\">send</i></button>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/init-account/init-account.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitAccountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_sitelinkAPI_sitelink_api_service__ = __webpack_require__("./src/app/services/sitelinkAPI/sitelink-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InitAccountComponent = /** @class */ (function () {
    function InitAccountComponent(activatedRoute, sitelinkAPIService, authService, router) {
        this.activatedRoute = activatedRoute;
        this.sitelinkAPIService = sitelinkAPIService;
        this.authService = authService;
        this.router = router;
        this.validLink = false;
        this.userData = { uId: null, newPass: '' };
    }
    InitAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        var data = { id: this.activatedRoute.snapshot.params.token };
        this.sitelinkAPIService.validateAccInit(data).subscribe(function (resp) {
            if (resp.success) {
                _this.validLink = true;
                _this.userData.uId = resp.userId;
            }
            else
                Object(__WEBPACK_IMPORTED_MODULE_4_angular2_materialize__["b" /* toast */])('Some error occurred. Please try again later.', 3000);
        });
    };
    InitAccountComponent.prototype.passwordInitSubmit = function (formValid) {
        var _this = this;
        if (!formValid)
            return false;
        if (this.pass != this.cnfPass)
            return false;
        this.userData.newPass = this.pass;
        this.authService.initPassword(this.userData).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_4_angular2_materialize__["b" /* toast */])('Some Error occurred. Please try again later.', 3000);
                return null;
            }
            _this.authService.loginSuccess(resp);
            _this.router.navigate(['dashboard']);
        });
    };
    InitAccountComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-init-account',
            template: __webpack_require__("./src/app/components/init-account/init-account.component.html"),
            styles: [__webpack_require__("./src/app/components/init-account/init-account.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__services_sitelinkAPI_sitelink_api_service__["a" /* SitelinkApiService */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], InitAccountComponent);
    return InitAccountComponent;
}());



/***/ }),

/***/ "./src/app/components/internship/internship.component.css":
/***/ (function(module, exports) {

module.exports = "#candiDP{\r\n    max-width: 200px;\r\n}\r\n\r\n.candiDPRow{\r\n    text-align: center;\r\n}\r\n\r\n#basicInfo{\r\n    margin-bottom: 120px;\r\n}\r\n\r\n.fltBtnArea{\r\n    position: relative;\r\n}\r\n\r\n#basicInfoRt{\r\n    text-align: right;\r\n}\r\n\r\n#BasicInfoEditBtn {\r\n    position: absolute;\r\n    right: 2%;\r\n    bottom: 0%;\r\n    -webkit-transform: translateY(+50%);\r\n            transform: translateY(+50%);\r\n}\r\n\r\n#basicInfoFormActions{\r\n    text-align: center;\r\n    margin-bottom: 30px;\r\n}\r\n\r\n#tabsArea{\r\n    margin-bottom: 50px;\r\n}"

/***/ }),

/***/ "./src/app/components/internship/internship.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"basicInfo\" class=\"row z-depth-2\">\n    <form (submit)='onBasicInfoSubmit(basicInfoForm.valid)' #basicInfoForm=\"ngForm\">\n        <div class=\"row\">\n            <div class=\"col s12 l6\">\n                <div class=\"input-field col s12\">\n                    <label for=\"title\">Project Name</label>\n                    <input id=\"title\" name='projectName' type=\"text\" [(ngModel)]=\"internship.projectName\" required [disabled]=\"!editingBasicInfo\" #title=\"ngModel\">\n                    <div [hidden]= \"title.valid || (title.pristine && !basicInfoForm.submitted) || !editingBasicInfo\" class=\"red-text\">\n                        Please input a valid project title for the project.\n                    </div>\n                </div>\n                <div class=\"input-field col s12\">\n                    <label for=\"description\">Description</label>\n                    <textarea id=\"description\" class=\"materialize-textarea\" name='description' [(ngModel)]=\"internship.description\" [disabled]=\"!editingBasicInfo\" data-length=\"200\"></textarea>\n                </div>\n                <div class=\"input-field col s12\">\n                    <label for=\"company\">Company</label>\n                    <input id=\"company\" name=\"company\" type=\"text\" [(ngModel)]=\"internship.company.name\" disabled>\n                </div>\n                <div class=\"input-field col s6\">\n                    <label for=\"startDate\">Start Date</label>\n                    <input id=\"startDate\" name='startDate' type=\"text\" [(ngModel)]=\"internship.startDate\" required [disabled]=\"!editingBasicInfo\" #startDate=\"ngModel\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 20, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n                    <div [hidden]= \"startDate.valid || (startDate.pristine && !basicInfoForm.submitted) || !editingBasicInfo\" class=\"red-text\">\n                        Please input a valid start date for the project.\n                    </div>\n                </div>\n                <div class=\"input-field col s6\">\n                    <label for=\"endDate\">Start Date</label>\n                    <input id=\"endDate\" name='endDate' type=\"text\" [(ngModel)]=\"internship.endDate\" required [disabled]=\"!editingBasicInfo\" #endDate=\"ngModel\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 20, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n                    <div [hidden]= \"endDate.valid || (endDate.pristine && !basicInfoForm.submitted) || !editingBasicInfo\" class=\"red-text\">\n                        Please input a valid end date for the project.\n                    </div>\n                </div>\n            </div>\n            <div id=\"basicInfoRt\" class=\"col s12 l6 right\">\n                <div class=\"row candiDPRow\">\n                    <img class=\"responsive-img\" id=\"candiDP\" [src]=\"internship.candidate.DP.url\" alt=\"Candidate profile picture\">\n                </div>\n                <div class=\"input-field col s12\">\n                    <label for=\"candiName\">Name</label>\n                    <input id=\"candiName\" name='name' type=\"text\" [(ngModel)]=\"internship.candidate.name\" disabled>\n                </div>\n                <div class=\"input-field col s12\">\n                    <label for=\"designation\">Designation</label>\n                    <input id=\"designation\" name='designation' type=\"text\" [(ngModel)]=\"internship.designation\" [disabled]=\"!editingBasicInfo\">\n                </div>\n                <div class=\"input-field col s12\">\n                    <label for=\"cmpGivenEmail\">Company email id</label>\n                    <input id=\"cmpGivenEmail\" name=\"cmpGivenEmail\" type=\"text\" [(ngModel)]=\"internship.cmpGivenEmail\" [disabled]=\"!editingBasicInfo\">\n                </div>\n            </div>\n        </div>\n        <div id=\"basicInfoFormActions\" [hidden]=\"!editingBasicInfo\">\n            <button type=\"submit\" class=\"btn btn-submit\">Save<i class=\"material-icons right\">send</i></button>\n            <button type=\"button\" (click)=\"editingBasicInfo = false\" class=\"btn red\">Cancel</button>\n        </div>\n        <div class=\"fltBtnArea\" [hidden]='editingBasicInfo'>\n            <a id=\"BasicInfoEditBtn\" (click)=\"editingBasicInfo = true\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">edit</i></a>\n        </div>\n    </form>\n</div>\n<div id=\"tabsArea\" class=\"col s12 z-depth-1\">\n    <ul class=\"tabs\">\n        <li class=\"tab\" [ngClass]=\"{'active': activatedChild == 'accommodation'}\" ><a [routerLink]=\"['accommodation']\">Accommodation</a></li>\n        <li class=\"tab\" *ngIf=\"userAccess != 1\" [ngClass]=\"{'active': activatedChild == 'weeklyReports'}\" ><a [routerLink]=\"['weeklyReports']\">Weekly Reports</a></li>\n        <li class=\"tab\" *ngIf=\"userAccess != 1\" [ngClass]=\"{'active': activatedChild == 'suica'}\" ><a [routerLink]=\"['suica']\">Suica</a></li>\n        <li class=\"tab\" *ngIf=\"userAccess != 1\" [ngClass]=\"{'active': activatedChild == 'stipend'}\" ><a [routerLink]=\"['stipend']\">Stipend</a></li>\n        <li class=\"tab\" *ngIf=\"userAccess != 1\" [ngClass]=\"{'active': activatedChild == 'wifi'}\" ><a [routerLink]=\"['wifi']\">Wi-Fi</a></li>\n        <li class=\"tab\" [ngClass]=\"{'active': activatedChild == 'feedback'}\" ><a [routerLink]=\"['feedback']\">Feedback</a></li>\n        <li class=\"tab\" [ngClass]=\"{'active': activatedChild == 'joboffer'}\" ><a [routerLink]=\"['joboffer']\">Job Offer</a></li>\n    </ul>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/components/internship/internship.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InternshipComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__ = __webpack_require__("./src/app/services/internshipAPI/internship-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/filter.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InternshipComponent = /** @class */ (function () {
    function InternshipComponent(route, router, intnshpService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.intnshpService = intnshpService;
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["JwtHelper"]();
        this.activatedChild = '';
        this.userAccess = 1;
        this.internship = { _id: '', projectName: '', startDate: '', endDate: '', description: '', designation: '', company: { name: '', admins: [''] }, candidate: { name: '', DP: { key: '', url: '' } }, cmpGivenEmail: '' };
        this.canAccess = false;
        this.editingBasicInfo = false;
        this.router.events.filter(function (evt) { return evt instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]; }).subscribe(function (event) {
            _this.activatedChild = _this.route.firstChild.routeConfig.path;
        });
        var token = localStorage.getItem('authToken');
        if (token) {
            this.decodedToken = this.jwtHelper.decodeToken(token);
            this.userAccess = this.decodedToken.access;
        }
        else
            router.navigate(['/']);
    }
    InternshipComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.intnshpId = this.route.snapshot.paramMap.get('id');
        this.intnshpService.getIntnshipDetails(this.intnshpId).subscribe(function (resp) {
            if (!resp.success) {
                return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])(resp.error, 3000);
            }
            _this.canAccess = true;
            _this.internship = resp.internship;
            setTimeout(function () {
                Materialize.updateTextFields();
            });
        });
    };
    InternshipComponent.prototype.onBasicInfoSubmit = function (isValid) {
        var _this = this;
        if (!isValid)
            return false;
        this.intnshpService.updateBasicInfo(this.internship).subscribe(function (resp) {
            if (!resp.success) {
                return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])(resp.error, 3000);
            }
            _this.editingBasicInfo = false;
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])(resp.msg, 3000);
            setTimeout(function () {
                Materialize.updateTextFields();
            });
        });
    };
    InternshipComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-internship',
            template: __webpack_require__("./src/app/components/internship/internship.component.html"),
            styles: [__webpack_require__("./src/app/components/internship/internship.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__["a" /* InternshipApiService */]])
    ], InternshipComponent);
    return InternshipComponent;
}());



/***/ }),

/***/ "./src/app/components/internships/internships.component.css":
/***/ (function(module, exports) {

module.exports = ".highlight tbody tr{\r\n    cursor: pointer;\r\n}\r\n\r\n.yrTabs{\r\n    margin-bottom: 100px;\r\n}\r\n\r\n.fltBtnArea{\r\n    position: relative;\r\n    margin: 70px 0 170px;\r\n}\r\n\r\n#initIntnshpBtn{\r\n  position: absolute;\r\n  right: 2%;\r\n  bottom: 0%;\r\n  -webkit-transform: translateY(+70%);\r\n          transform: translateY(+70%);\r\n}"

/***/ }),

/***/ "./src/app/components/internships/internships.component.html":
/***/ (function(module, exports) {

module.exports = "<ul class=\"tabs z-depth-1 yrTabs\">\n  <li *ngFor=\"let year of yearArr\" class=\"tab\"><a id=\"year\" (click)=\"onYearTabClick(year)\">{{year}}</a></li>\n</ul>\n<div *ngIf=\"internships.length\" class=\"intershipsList\">\n  <table class=\"highlight\">\n    <thead>\n      <tr>\n        <th>\n          Sr. no.\n        </th>\n        <th>\n          Candidate Name\n        </th>\n        <th>\n          Company Name\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor =\"let internship of internships; let i = index\" (click)=\"onIntnshpClick(i)\">\n        <td>\n          {{i + 1}}\n        </td>\n        <td>\n          {{internship.candidate.name}}\n        </td>\n        <td>\n          {{internship.company.name}}\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<div class=\"fltBtnArea\">\n  <a id=\"initIntnshpBtn\" href=\"#initIntenshpModal\" class=\"btn-floating modal-trigger btn-large waves-effect waves-light red\"><i class=\"material-icons\">add</i></a>\n</div>\n\n<div id=\"initIntenshpModal\" class=\"modal modal-fixed-footer\" materialize=\"modal\">\n  <div class=\"modal-content\">\n    <form (ngSubmit)=\"onIntnshpCreateClick(form.valid)\" #form=ngForm>\n      <div class=\"input-field col s12\">\n        <label for=\"company\"> Company Name</label>\n        <input id=\"company\" type=\"text\" name=\"companyName\" [formControl]=\"companySearchControl\" [(ngModel)]=\"newIntnshp.companyName\" required  materialize=\"autocomplete\" [materializeParams]=\"companyAutocompleteParams\" [materializeActions]=\"companySearchBoxAction\">\n        <!--<div [hidden]= \"cmpName.valid || (cmpName.pristine && !form.submitted)\" class=\"red-text\">\n          Please input a valid company name.\n        </div>-->\n      </div>\n      <div class=\"input-field col s12\">\n        <label for=\"candidate\"> Candidate email address</label>\n        <input id=\"candidate\" type=\"text\" name=\"candidateEmail\" [(ngModel)]=\"newIntnshp.candidateEmail\" required [formControl]=\"candidateSearchControl\" materialize=\"autocomplete\" [materializeParams]=\"candidateAutocompleteParams\" [materializeActions]=\"candidateSearchBoxAction\">\n        <!--<div [hidden]= \"candidateName.valid || (candidateName.pristine && !form.submitted)\" class=\"red-text\">\n          Please input a valid candidate name.\n        </div>-->\n      </div>\n    </form>\n  </div>\n  <div class=\"modal-footer\">\n    <a (click)=\"form.ngSubmit.emit()\" class=\"waves-effect waves-green btn-flat \">Create</a>\n    <a class=\"modal-action modal-close waves-effect waves-green btn-flat \">Cancel</a>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/internships/internships.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InternshipsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__ = __webpack_require__("./src/app/services/internshipAPI/internship-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_autocompleteAPI_autocomplete_api_service__ = __webpack_require__("./src/app/services/autocompleteAPI/autocomplete-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators__ = __webpack_require__("./node_modules/rxjs/_esm5/operators.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var InternshipsComponent = /** @class */ (function () {
    function InternshipsComponent(internshipService, router, autocompleteService) {
        this.internshipService = internshipService;
        this.router = router;
        this.autocompleteService = autocompleteService;
        this.yearArr = [];
        this.internships = [];
        this.newIntnshp = { companyName: '', candidateEmail: '' };
        this.companyAutocompleteParams = [];
        this.candidateAutocompleteParams = [];
        this.companySearchBoxAction = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.candidateSearchBoxAction = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    InternshipsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companySearchControl = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormControl */]('');
        this.candidateSearchControl = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormControl */]('');
        this.companySearchControl.valueChanges
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__["a" /* debounceTime */])(400), Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__["b" /* distinctUntilChanged */])())
            .subscribe(function (term) {
            _this.autocompleteService.getCompanySuggestions(term).subscribe(function (resp) {
                _this.companyAutocompleteParams = [{ data: resp.data }];
                setTimeout(function () {
                    _this.companySearchBoxAction.emit('autocomplete');
                });
            });
        });
        this.candidateSearchControl.valueChanges
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__["a" /* debounceTime */])(400), Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__["b" /* distinctUntilChanged */])())
            .subscribe(function (term) {
            _this.autocompleteService.getCandidateSuggestions(term).subscribe(function (resp) {
                _this.candidateAutocompleteParams = [{ data: resp.data }];
                setTimeout(function () {
                    _this.candidateSearchBoxAction.emit('autocomplete');
                });
            });
        });
        var currYear = (new Date()).getFullYear();
        var tmpYear = currYear;
        while (tmpYear >= 2018) {
            this.yearArr.push(tmpYear);
            tmpYear--;
        }
        this.onYearTabClick(currYear);
    };
    InternshipsComponent.prototype.onYearTabClick = function (year) {
        var _this = this;
        this.internshipService.getInternships(year).subscribe(function (resp) {
            if (!resp.success)
                return Object(__WEBPACK_IMPORTED_MODULE_4_angular2_materialize__["b" /* toast */])("Some error occurred, Please try again later.", 3000);
            _this.internships = resp.internships;
        });
    };
    InternshipsComponent.prototype.onIntnshpClick = function (index) {
        this.router.navigate(['/internship/' + this.internships[index]._id]);
    };
    InternshipsComponent.prototype.onIntnshpCreateClick = function (isValidForm) {
        if (this.newIntnshp.companyName == "" || this.newIntnshp.candidateEmail == "")
            return Object(__WEBPACK_IMPORTED_MODULE_4_angular2_materialize__["b" /* toast */])("Please fill in both the candidate and company name", 3000);
        this.internshipService.createInternship(this.newIntnshp).subscribe(function (resp) {
            if (!resp.success) {
                console.log(resp.error);
                return Object(__WEBPACK_IMPORTED_MODULE_4_angular2_materialize__["b" /* toast */])('Some error occurred, please try again later.', 3000);
            }
            Object(__WEBPACK_IMPORTED_MODULE_4_angular2_materialize__["b" /* toast */])('Intership Created successfully and email sent to companies', 3000);
        });
    };
    InternshipsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-internships',
            template: __webpack_require__("./src/app/components/internships/internships.component.html"),
            styles: [__webpack_require__("./src/app/components/internships/internships.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__["a" /* InternshipApiService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__services_autocompleteAPI_autocomplete_api_service__["a" /* AutocompleteApiService */]])
    ], InternshipsComponent);
    return InternshipsComponent;
}());



/***/ }),

/***/ "./src/app/components/job-offer/job-offer.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/job-offer/job-offer.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  job-offer works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/job-offer/job-offer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobOfferComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var JobOfferComponent = /** @class */ (function () {
    function JobOfferComponent() {
    }
    JobOfferComponent.prototype.ngOnInit = function () {
    };
    JobOfferComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-job-offer',
            template: __webpack_require__("./src/app/components/job-offer/job-offer.component.html"),
            styles: [__webpack_require__("./src/app/components/job-offer/job-offer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], JobOfferComponent);
    return JobOfferComponent;
}());



/***/ }),

/***/ "./src/app/components/payments/payments.component.css":
/***/ (function(module, exports) {

module.exports = ".fltBtnArea{\r\n    position: relative;\r\n    margin: 25px 0px 175px;\r\n}\r\n\r\n#addPaymentBtn {\r\n    position: absolute;\r\n    right: 2%;\r\n    bottom: 0%;\r\n    -webkit-transform: translateY(+70%);\r\n            transform: translateY(+70%);\r\n}\r\n\r\n#tblContent{\r\n    text-align: center;\r\n}\r\n\r\ntable.highlight tbody tr{\r\n    cursor: pointer;\r\n}\r\n\r\n.chkBxDiv{\r\n    margin-top: 30px;\r\n}"

/***/ }),

/***/ "./src/app/components/payments/payments.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"tblContent\">\n  <table class=\"highlight\">\n    <thead>\n      <tr>\n        <th>Amount</th>\n        <th>On</th>\n        <th>Received</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let payment of payments; let i = index\" (click)='editCretePaymentClicked(i)'>\n        <td>{{payment.amt}}</td>\n        <td>{{payment.date}}</td>\n        <td>{{payment.acptd}}</td>\n      </tr>\n    </tbody>\n  </table>\n  <div class=\"fltBtnArea\">\n    <a *ngIf='isWLMember' (click)='editCretePaymentClicked(-1)' id=\"addPaymentBtn\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">add</i></a>\n  </div>\n</div>\n\n<div id=\"stipendEditModal\" class=\"modal modal-fixed-footer\" materialize=\"modal\" [materializeActions]=\"modalActions\">\n  <div class=\"modal-content\">\n    <form (ngSubmit)='upsertStipendInfo(paymentForm.valid)' #paymentForm=ngForm>\n      <h3>Create/Edit stipend</h3>\n      <div class=\"row\">\n        <div class=\"input-field col s4\">\n          <label for=\"amount\"> Stipend amount</label>\n          <input id=\"amount\" name=\"amt\" [(ngModel)]=\"upsertPayment.amt\" type=\"text\" required #amt=\"ngModel\">\n          <div [hidden]= \"amt.valid || (amt.pristine && !paymentForm.submitted)\" class=\"red-text\">\n            Please input a valid Amount.\n          </div>\n        </div>\n        <div class=\"input-field col s5\">\n          <label for=\"on\">Date</label>\n          <input id=\"on\" name=\"date\" [(ngModel)]=\"upsertPayment.date\" type=\"text\" required #date=\"ngModel\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 20, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n          <div [hidden]= \"date.valid || (date.pristine && !paymentForm.submitted)\" class=\"red-text\">\n            Please input a valid date.\n          </div>\n        </div>\n        <div class=\"chkBxDiv col s2\" [hidden]=\"upsertPayment.index == -1\">\n          <input id=\"acptd\" type=\"checkbox\" name='acptd' [(ngModel)]=\"upsertPayment.acptd\">\n          <label for=\"acptd\">Accepted</label>\n        </div>\n      </div>\n    </form>\n  </div>\n  <div class=\"modal-footer\">\n    <a (click)=\"paymentForm.ngSubmit.emit()\" class=\"modal-action modal-close waves-effect waves-green btn-flat \">Save</a>\n    <a class=\"modal-action modal-close waves-effect waves-green btn-flat \">Cancel</a>\n    <span [hidden]=\"upsertPayment.index == -1\"><a (click)=\"deleteStipend()\" class=\"modal-action modal-close waves-effect waves-red btn-flat \">Delete</a></span> \n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/payments/payments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__ = __webpack_require__("./src/app/services/internshipAPI/internship-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PaymentsComponent = /** @class */ (function () {
    function PaymentsComponent(route, intnshpService) {
        this.route = route;
        this.intnshpService = intnshpService;
        this.modalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.isWLMember = false;
        this.upsertPayment = { index: -1, amt: 0, date: '', acptd: false };
    }
    PaymentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.intnshpService.isWLMember().subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('Some error occurred, please try again later', 3000);
                console.log(resp.error);
                return false;
            }
            _this.isWLMember = resp.isWLMember;
        });
        this.intnshpId = this.route.parent.snapshot.paramMap.get('id');
        this.intnshpService.loadStipends(this.intnshpId).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Some error occurred, please try again later.", 3000);
                console.log(resp.error);
                return false;
            }
            _this.payments = resp.payments;
        });
    };
    PaymentsComponent.prototype.editCretePaymentClicked = function (index) {
        if (!this.isWLMember)
            return false;
        if (index == -1) {
            this.upsertPayment = { index: -1, amt: 0, date: '', acptd: false };
        }
        else {
            this.upsertPayment.amt = this.payments[index].amt;
            this.upsertPayment.date = this.payments[index].date;
            this.upsertPayment.index = index;
        }
        this.modalActions.emit({ action: 'modal', params: ['open'] });
    };
    PaymentsComponent.prototype.upsertStipendInfo = function (isValidForm) {
        var _this = this;
        if (!isValidForm) {
            return false;
        }
        this.intnshpService.upsertStipend(this.intnshpId, this.upsertPayment).subscribe(function (resp) {
            if (!resp.success) {
                console.log(resp.error);
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("some error occurred, please try agin later.", 3000);
                _this.upsertPayment = { index: -1, amt: 0, date: '', acptd: false };
                return false;
            }
            _this.upsertPayment = { index: -1, amt: 0, date: '', acptd: false };
            _this.payments = resp.payments;
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Information updated successfully.", 3000);
        });
    };
    PaymentsComponent.prototype.deleteStipend = function () {
        var _this = this;
        if (confirm("are you sure to want to delete this Stipend data?")) {
            this.intnshpService.deleteStipend(this.intnshpId, this.upsertPayment.index).subscribe(function (resp) {
                if (!resp.success) {
                    return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Some error occurred please try again later.", 3000);
                }
                _this.upsertPayment = { index: -1, amt: 0, date: '', acptd: false };
                _this.payments = resp.payments;
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Information deleted successfully.", 3000);
            });
        }
    };
    PaymentsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-payments',
            template: __webpack_require__("./src/app/components/payments/payments.component.html"),
            styles: [__webpack_require__("./src/app/components/payments/payments.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__["a" /* InternshipApiService */]])
    ], PaymentsComponent);
    return PaymentsComponent;
}());



/***/ }),

/***/ "./src/app/components/profile/profile.component.css":
/***/ (function(module, exports) {

module.exports = "#infoEditBtn {\r\n    position: absolute;\r\n    right: 2%;\r\n    bottom: 0%;\r\n    -webkit-transform: translateY(+70%);\r\n            transform: translateY(+70%);\r\n}\r\n\r\n.rawInfo, .imgArea{\r\n    position: relative;\r\n}\r\n\r\n.imgArea:hover img{\r\n    opacity:0.5;\r\n}\r\n\r\n.imgArea:hover a {\r\n    display: block;\r\n}\r\n\r\n.imgArea a {\r\n    position:absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    display:none;\r\n    -webkit-transform: translateY(-50%) translateX(-50%);\r\n            transform: translateY(-50%) translateX(-50%);\r\n}\r\n\r\nH3{\r\n    text-align: center;\r\n}\r\n\r\n.imgArea{\r\n    text-align: center;\r\n}"

/***/ }),

/***/ "./src/app/components/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12 l6\" id=\"basicInfo\">\n    <h3>Basic Details</h3>\n    <div class=\"formArea\" [hidden]=\"!editing\">\n      <form (submit)=\"userInfoSubmit(form.valid)\" #form=ngForm>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <input id=\"name\" name=\"name\" [(ngModel)]=\"userDetails.name\" type=\"text\" #name=\"ngModel\" required>\n            <label for=\"name\" class=\"active\">Name</label>\n            <div [hidden]= \"name.valid || (name.pristine && !form.submitted)\" class=\"red-text\">\n              Please input a Name.\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <input id=\"DOB\" type=\"text\" name=\"DOB\" [(ngModel)]=\"userDetails.DOB\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 100, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n            <label for=\"DOB\" class=\"active\">Birth Date</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field\">\n            <label for=\"phNum\" class=\"active\">Phone Number</label>\n            <input type=\"text\" [(ngModel)]=\"userDetails.phNum\" name=\"phNum\" id=\"phNum\">\n          </div>\n        </div>\n        <button type=\"submit\" class=\"btn btn-submit\">Save<i class=\"material-icons right\">send</i></button>\n        <button type=\"button\" (click)='cancelInfoEditClick()' class=\"btn red\">cancel</button>\n      </form>\n    </div>\n    <div class=\"rawInfo\" [hidden]=\"editing\">\n      <div class=\"row\">\n        <div class=\"col s5\">Name:</div>\n        <div class=\"col s7\">{{userDetails.name}}</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s5\">Date of birth</div>\n        <div class=\"col s7\">{{userDetails.DOB | date:'longDate'}}</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s5\">Phone:</div>\n        <div class=\"col s7\">{{userDetails.phNum}}</div>\n      </div>\n      <a id=\"infoEditBtn\" (click)=\"editInfoClick()\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">edit</i></a>\n    </div>\n  </div>\n  <div class=\"col s12 l6\" id=\"displayPic\">\n    <h3>Display Picture</h3>\n    <div class=\"imgArea\">\n      <img [src]=\"userDetails.DP.url\" class=\"responsive-img circle\" alt=\"User display picture\">\n      <a href=\"#DPUploadModal\" class=\"btn-floating modal-trigger btn-large waves-effect waves-light red\"><i class=\"material-icons\">edit</i></a>\n    </div>\n  </div>\n</div>\n<div class=\"row\" id=\"passwordChangeArea\">\n  <div class=\"col s12\">\n    <div class=\"container\">\n      <h3>Change password</h3>\n      <form (submit)=\"passwordChangeSubmit(form2.valid)\" #form2=ngForm>\n        <div class=\"input-field col s12\">\n          <label for=\"currPass\"> Current password</label>\n          <input id=\"currPass\" name=\"currPass\" [(ngModel)]=\"passwords.currPass\" type=\"password\" #currPass=\"ngModel\"  required>\n          <div [hidden]= \"currPass.valid || (currPass.pristine && !form2.submitted)\" class=\"red-text\">\n            Please input current password.\n          </div>\n        </div>\n        <div class=\"input-field col s12\">\n          <label for=\"newPass\"> New password</label>\n          <input id=\"newPass\" name=\"newPass\" [(ngModel)]=\"passwords.newPass\" type=\"password\" #newPass=\"ngModel\" required validateEqual=\"cnfPass\" reverse=\"true\">\n          <div [hidden]= \"newPass.valid || (newPass.pristine && !form2.submitted)\" class=\"red-text\">\n            Please input new Password.\n          </div>\n        </div>\n        <div class=\"input-field col s12\">\n          <label for=\"cnfPass\">Confirm Password</label>\n          <input id=\"cnfPass\" name=\"cnfPass\" [(ngModel)]=\"passwords.cnfPass\" type=\"password\" #cnfPass=\"ngModel\" required validateEqual=\"newPass\" reverse=\"false\">\n          <div [hidden]= \"cnfPass.valid || (cnfPass.pristine && !form2.submitted)\" class=\"red-text\">\n            Passwords do not match.\n          </div>\n        </div>\n        <button type=\"submit\" class=\"btn btn-submit\">Update password<i class=\"material-icons right\">send</i></button>\n      </form>\n    </div>\n  </div>\n</div>\n<div id=\"DPUploadModal\" class=\"modal modal-fixed-footer\" materialize=\"modal\">\n  <div class=\"modal-content\">\n    <img-cropper [image]=\"imgData\" [settings]=\"cropperSettings\" (onCrop)=\"cropped($event)\"></img-cropper>\n  </div>\n  <div class=\"modal-footer\">\n    <a (click)=\"onDPUploadClick()\" class=\"modal-action modal-close waves-effect waves-green btn-flat \">Save</a>\n    <a class=\"modal-action modal-close waves-effect waves-green btn-flat \">Cancel</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_img_cropper__ = __webpack_require__("./node_modules/ngx-img-cropper/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.editing = false;
        this.userDetails = { _id: '', name: "", DOB: "", phNum: "", DP: { key: "", url: "" } };
        this.passwords = { currPass: '', newPass: '', cnfPass: '' };
        this.cropperSettings = new __WEBPACK_IMPORTED_MODULE_4_ngx_img_cropper__["a" /* CropperSettings */]();
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.canvasWidth = 800;
        this.cropperSettings.canvasHeight = 450;
        this.cropperSettings.minWidth = 10;
        this.cropperSettings.minHeight = 10;
        this.cropperSettings.rounded = true;
        //this.cropperSettings.keepAspect = false;
        this.cropperSettings.dynamicSizing = true;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.imgData = {};
    }
    ProfileComponent.prototype.cropped = function (bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
    };
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUserInfo().subscribe(function (resp) {
            if (!resp.success)
                return false;
            _this.userDetails = resp.profileData;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent.prototype.fileChangeListener = function ($event) {
        var image = new Image();
        var file = $event.target.files[0];
        var myReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
    };
    ProfileComponent.prototype.convertToBlob = function (base64Str) {
        var binary = atob(base64Str.split(',')[1]);
        var array = [];
        var mimestring = base64Str.split(',')[0].split(':')[1].split(';')[0];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: mimestring });
    };
    ProfileComponent.prototype.editInfoClick = function () {
        this.editing = true;
        Materialize.updateTextFields();
    };
    ProfileComponent.prototype.cancelInfoEditClick = function () {
        this.editing = false;
        Materialize.updateTextFields();
    };
    ProfileComponent.prototype.userInfoSubmit = function (validForm) {
        var _this = this;
        if (!validForm)
            return false;
        this.editing = false;
        this.authService.updateUserInfo(this.userDetails).subscribe(function (resp) {
            resp.success ? _this.userInfoMsg = "User information updated successfully." : _this.userInfoMsg = "Some error occurred, please try agin later.";
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])(_this.userInfoMsg, 3000);
        });
    };
    ProfileComponent.prototype.onDPUploadClick = function () {
        var _this = this;
        var formData = new FormData();
        var blob = this.convertToBlob(this.imgData.image);
        formData.append('displayPicture', blob);
        this.authService.updateDisplayPic(formData).subscribe(function (resp) {
            if (resp.success) {
                _this.userDetails.DP.url = resp.newLink;
                //load Header info as well
                _this.displayPicMsg = "Display Picture updated successfully";
            }
            else {
                _this.displayPicMsg = "Some error occurred, please try agin later";
            }
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])(_this.displayPicMsg, 3000);
        });
    };
    ProfileComponent.prototype.passwordChangeSubmit = function (validForm) {
        var _this = this;
        if (!validForm)
            return false;
        if (this.passwords.newPass != this.passwords.cnfPass)
            return false;
        var userData = { userId: this.userDetails._id, newPass: this.passwords.newPass };
        this.authService.updatePassword(userData).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Some Error occurred. Please try again later", 3000);
                return null;
            }
            _this.authService.loginSuccess(resp);
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Password updated successfully", 3000);
            ;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('cropper', undefined),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ngx_img_cropper__["b" /* ImageCropperComponent */])
    ], ProfileComponent.prototype, "cropper", void 0);
    ProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__("./src/app/components/profile/profile.component.html"),
            styles: [__webpack_require__("./src/app/components/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/components/reset-password/reset-password.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/reset-password/reset-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12\">\n    <div class=\"container\">\n      <h3>Password setup</h3>\n      <form (submit)=\"passwordResetSubmit(form.valid)\" #form=ngForm>\n        <div class=\"input-field col s6\">\n          <label for=\"password\">Password</label>\n          <input id=\"password\" name=\"password\" [(ngModel)]=\"registerUser.password\" type=\"password\" #password=\"ngModel\"  required validateEqual=\"cnfPass\" reverse=\"true\">\n          <div [hidden]= \"password.valid || (password.pristine && !form.submitted)\" class=\"red-text\">\n            Please input a Password.\n          </div>\n        </div>\n        <div class=\"input-field col s6\">\n          <label for=\"cnfPass\">Confirm Password</label>\n          <input id=\"cnfPass\" name=\"cnfPass\" [(ngModel)]=\"registerUser.cnfPass\" type=\"password\" #cnfPass=\"ngModel\"  required validateEqual=\"password\" reverse=\"false\">\n          <div [hidden]= \"cnfPass.valid || (cnfPass.pristine && !form.submitted)\" class=\"red-text\">\n            Passwords do not match.\n          </div>\n        </div>\n        <button type=\"submit\" class=\"btn btn-submit\">Update password<i class=\"material-icons right\">send</i></button>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/reset-password/reset-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_sitelinkAPI_sitelink_api_service__ = __webpack_require__("./src/app/services/sitelinkAPI/sitelink-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(activatedRoute, sitelinkAPIService, authService, router) {
        this.activatedRoute = activatedRoute;
        this.sitelinkAPIService = sitelinkAPIService;
        this.authService = authService;
        this.router = router;
        this.validLink = false;
        this.userData = { userId: null, newPass: '' };
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        var data = { id: this.activatedRoute.snapshot.params.token };
        this.sitelinkAPIService.validateAccInit(data).subscribe(function (resp) {
            if (resp.success) {
                _this.validLink = true;
                _this.userData.userId = resp.userId;
            }
            else
                Object(__WEBPACK_IMPORTED_MODULE_4_angular2_materialize__["b" /* toast */])('Some error occurred. Please try again later.', 3000);
        });
    };
    ResetPasswordComponent.prototype.passwordResetSubmit = function (formValid) {
        var _this = this;
        if (!formValid)
            return false;
        if (this.pass != this.cnfPass)
            return false;
        this.userData.newPass = this.pass;
        this.authService.resetPassword(this.userData).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_4_angular2_materialize__["b" /* toast */])('Some Error occurred. Please try again later.', 3000);
                return null;
            }
            _this.authService.loginSuccess(resp);
            _this.router.navigate(['dashboard']);
        });
    };
    ResetPasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__("./src/app/components/reset-password/reset-password.component.html"),
            styles: [__webpack_require__("./src/app/components/reset-password/reset-password.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__services_sitelinkAPI_sitelink_api_service__["a" /* SitelinkApiService */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/components/suica/suica.component.css":
/***/ (function(module, exports) {

module.exports = ".fltBtnArea{\r\n    position: relative;\r\n    margin-bottom: 150px;\r\n}\r\n\r\n#suicaInfoEditBtn {\r\n    position: absolute;\r\n    right: 2%;\r\n    bottom: 0%;\r\n    -webkit-transform: translateY(+70%);\r\n            transform: translateY(+70%);\r\n}\r\n\r\n#suicaInfoFormActions{\r\n    text-align: center;\r\n    margin-bottom: 100px;\r\n}"

/***/ }),

/***/ "./src/app/components/suica/suica.component.html":
/***/ (function(module, exports) {

module.exports = "<form (submit)=\"upsertSuicaInfo(suicaForm.valid)\" #suicaForm=ngForm>\n  <div class=\"row\">\n    <div class=\"input-field col s12\">\n      <label for=\"cardNo\">Card Number</label>\n      <input id=\"cardNo\" name='cardNo' type=\"text\" [(ngModel)]=\"suicaInfo.cardNo\" required [disabled]=\"!editingSuicaInfo\" #cardNo=\"ngModel\">\n      <div [hidden]= \"cardNo.valid || (cardNo.pristine && !suicaForm.submitted) || !editingSuicaInfo\" class=\"red-text\">\n          Please input a valid card number.\n      </div>\n    </div>\n    <div class=\"input-field col s12\">\n      <label for=\"line\">Train line</label>\n      <input id=\"line\" name='line' type=\"text\" [(ngModel)]=\"suicaInfo.line\" [disabled]=\"!editingSuicaInfo\">\n    </div>\n    <div class=\"input-field col s12\">\n      <label for=\"from\">From station</label>\n      <input id=\"from\" name='from' type=\"text\" [(ngModel)]=\"suicaInfo.from\" [disabled]=\"!editingSuicaInfo\">\n    </div>\n    <div class=\"input-field col s12\">\n      <label for=\"to\">To station</label>\n      <input id=\"to\" name='to' type=\"text\" [(ngModel)]=\"suicaInfo.to\" [disabled]=\"!editingSuicaInfo\">\n    </div>\n    <div class=\"input-field col s12\">\n      <label for=\"name\">Issuing company</label>\n      <input id=\"name\" name='name' type=\"text\" [(ngModel)]=\"suicaInfo.name\" [disabled]=\"!editingSuicaInfo\">\n    </div>\n    <div class=\"input-field col s6\">\n      <label for=\"issuedOn\" class=\"active\">Issued On</label>\n      <input id=\"issuedOn\" type=\"text\" name=\"issued\" [(ngModel)]=\"suicaInfo.issued\" class=\"datepicker\" [disabled]=\"!editingSuicaInfo\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 20, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n    </div>\n    <div class=\"input-field col s6\">\n      <label for=\"expiry\" class=\"active\">Expiry</label>\n      <input id=\"expiry\" type=\"text\" name=\"expiry\" [(ngModel)]=\"suicaInfo.expiry\" class=\"datepicker\" [disabled]=\"!editingSuicaInfo\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 20, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n    </div>\n    <div *ngIf= 'isWLMember' class=\"input-field col s12\">\n      <label for=\"cmnts\">Additional remarks/comments</label>\n      <textarea id=\"cmnts\" class=\"materialize-textarea\" name='cmnts' [(ngModel)]=\"suicaInfo.cmnts\" [disabled]=\"!editingSuicaInfo\"></textarea>\n    </div>\n    <div id=\"suicaInfoFormActions\" [hidden]=\"!editingSuicaInfo\">\n        <button type=\"submit\" class=\"btn btn-submit\">Save<i class=\"material-icons right\">send</i></button>\n        <button type=\"button\" (click)=\"editingSuicaInfo = false\" class=\"btn red\">Cancel</button>\n    </div>\n  </div>\n</form>\n<div [hidden]=\"editingSuicaInfo\" class=\"fltBtnArea\">\n  <a *ngIf= 'isWLMember' id=\"suicaInfoEditBtn\" (click)=\"editingSuicaInfo = true\" class=\"btn-floating btn-large waves-effect waves-light red\" ><i class=\"material-icons\">edit</i></a>\n</div>\n"

/***/ }),

/***/ "./src/app/components/suica/suica.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuicaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__ = __webpack_require__("./src/app/services/internshipAPI/internship-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SuicaComponent = /** @class */ (function () {
    function SuicaComponent(route, intnshpService) {
        this.route = route;
        this.intnshpService = intnshpService;
        this.editingSuicaInfo = false;
        this.isWLMember = true;
        this.suicaInfo = { cardNo: 0, line: '', from: '', to: '', name: '', issued: '', expiry: '', acptd: true, cmnts: '' };
    }
    SuicaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.intnshpId = this.route.parent.snapshot.paramMap.get('id');
        this.intnshpService.loadSuicaDetails(this.intnshpId).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('Some error occurred, please try again later.');
                return false;
            }
            if (!resp.suica.hasOwnProperty('cmnts')) {
                resp.suica['cmnts'] = '';
                _this.isWLMember = false;
            }
            _this.suicaInfo = resp.suica;
            setTimeout(function () {
                Materialize.updateTextFields();
            });
        });
    };
    SuicaComponent.prototype.upsertSuicaInfo = function (isValidForm) {
        var _this = this;
        if (!isValidForm) {
            return false;
        }
        this.intnshpService.upsertSuicaDetails(this.intnshpId, this.suicaInfo).subscribe(function (resp) {
            if (!resp.success) {
                console.log(resp.error);
                return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("some error occurred, please try agin later.", 3000);
            }
            _this.suicaInfo = resp.suica;
            _this.editingSuicaInfo = false;
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Information updated successfully.", 3000);
            setTimeout(function () {
                Materialize.updateTextFields();
            });
        });
    };
    SuicaComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-suica',
            template: __webpack_require__("./src/app/components/suica/suica.component.html"),
            styles: [__webpack_require__("./src/app/components/suica/suica.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__["a" /* InternshipApiService */]])
    ], SuicaComponent);
    return SuicaComponent;
}());



/***/ }),

/***/ "./src/app/components/verify-email/verify-email.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/verify-email/verify-email.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  verify-email works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/verify-email/verify-email.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerifyEmailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VerifyEmailComponent = /** @class */ (function () {
    function VerifyEmailComponent() {
    }
    VerifyEmailComponent.prototype.ngOnInit = function () {
    };
    VerifyEmailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-verify-email',
            template: __webpack_require__("./src/app/components/verify-email/verify-email.component.html"),
            styles: [__webpack_require__("./src/app/components/verify-email/verify-email.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], VerifyEmailComponent);
    return VerifyEmailComponent;
}());



/***/ }),

/***/ "./src/app/components/weekly-reports/weekly-reports.component.css":
/***/ (function(module, exports) {

module.exports = ".tabs-vertical .tabs {\r\n  margin-top: 20px; \r\n  height: auto;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column; \r\n}\r\n\r\n.tabs-vertical .tab {\r\n  width: 100%;\r\n  box-flex: 1;\r\n  -webkit-box-flex: 1;\r\n      -ms-flex-positive: 1;\r\n          flex-grow: 1;\r\n  display: block;\r\n  float: left;\r\n  text-align: left;\r\n  line-height: 48px;\r\n  height: 48px;\r\n  padding: 0;\r\n  margin: 0;\r\n  text-transform: uppercase;\r\n  text-overflow: ellipsis; \r\n}\r\n\r\n.tabs-vertical .tab .active {\r\n  -webkit-transition: border-color .5s ease;\r\n  transition: border-color .5s ease;\r\n  border-right: 3px solid #7280ce;\r\n  color: #3f51b5; \r\n}\r\n\r\n.tabs-vertical .tab a {\r\n  color: #3f51b5;\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n  -webkit-transition: color 0.28s ease;\r\n  transition: color 0.28s ease; \r\n}\r\n\r\n.tabs-vertical .tab a:hover {\r\n  color: #8591d5; \r\n}\r\n\r\n.tabs-vertical .tab.disabled a {\r\n  color: #8591d5;\r\n  cursor: default; \r\n}\r\n\r\n.tabs-vertical .indicator {\r\n  display: none; \r\n}\r\n\r\n#reptEditBtnArea{\r\n  position: relative;\r\n  margin: 100px 0 170px;\r\n}\r\n\r\n#reptEditBtn {\r\n  position: absolute;\r\n  right: 2%;\r\n  bottom: 0%;\r\n  -webkit-transform: translateY(+70%);\r\n          transform: translateY(+70%);\r\n}\r\n\r\n.reptCreateBtnArea{\r\n  text-align: center;\r\n}\r\n\r\n#reptCreateBtn{\r\n  margin-top: 20px;\r\n}\r\n\r\n#comments form{\r\n  margin: 100px 0;\r\n}\r\n\r\n.dpImgDiv{\r\n  position: relative;\r\n}\r\n\r\n.dpImg{\r\n  position: absolute;\r\n  top: 15%;\r\n}\r\n\r\n.rtPane{\r\n  border-left: 2px solid gray;\r\n}\r\n\r\n.lftPane{\r\n  text-align: center;\r\n  min-height: 300px;\r\n}\r\n\r\n.cmtOptionsArea{\r\n  position: relative;\r\n}\r\n\r\n#cmtOptions{\r\n  position: absolute;\r\n  right: 0%;\r\n  bottom: 0%;\r\n  -webkit-transform: translate(+40%, +40%);\r\n          transform: translate(+40%, +40%);\r\n}\r\n\r\n.container10p{\r\n  width: 100%;\r\n  padding: 0 10%;\r\n}\r\n\r\n.InpLabelClr{\r\n  color: #9e9e9e;\r\n}\r\n\r\n.reptTxt{\r\n  padding-left: 3%\r\n}\r\n\r\n.WReptImg{\r\n  display: block;\r\n  max-width: 100%;\r\n  margin: 5% auto;\r\n}"

/***/ }),

/***/ "./src/app/components/weekly-reports/weekly-reports.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row z-depth-1\">\n <div class=\"tabs-vertical\">\n    <div class=\"col s5 m4 l3 lftPane\">\n      <h5>Week</h5>\n      <ul class=\"tabs\">\n        <li class=\"tab\" *ngFor='let report of wReports; let i= index' [ngClass]=\"{ 'active': viewingRept == i }\" (click)='onWeekClick(i)'>\n          <a href=\"#\" (click)='onWeekClick(i)'>{{report?.week?.sDate | date:'shortDate'}} ~ {{report?.week?.eDate | date:'shortDate'}}</a>\n        </li>\n      </ul>\n      <div class=\"reptCreateBtnArea\">\n        <a id=\"reptCreateBtn\" (click)=\"editCreateReptClick(-1)\" class=\"btn-floating waves-effect waves-light red\"><i class=\"material-icons\">add</i></a>\n      </div>\n    </div>\n    <div [hidden]=\"viewingRept == -1\" class=\"col s7 m8 l9 rtPane\">\n      <div class=\"container10p\">\n        <div>\n          <h6 class=\"InpLabelClr\">Difficulty level of the project: X our of 10 (10 being the highest)</h6>\n          <pre class=\"reptTxt\">{{wReports[viewingRept]?.rept?.difficulty}}</pre>\n        </div>\n        <div>\n          <h6 class=\"InpLabelClr\">Things you've learnt through the project</h6>\n          <pre class=\"reptTxt\">{{wReports[viewingRept]?.rept?.learnt}}</pre>\n        </div>\n        <div>\n          <h6 class=\"InpLabelClr\">Languages/Tools/Applications used this week</h6>\n          <pre class=\"reptTxt\">{{wReports[viewingRept]?.rept?.tech}}</pre>\n        </div>\n        <div>\n          <h6 class=\"InpLabelClr\">Any questions/concerns you want to ask to your supervisor?</h6>\n          <pre class=\"reptTxt\">{{wReports[viewingRept]?.rept?.supQuery}}</pre>\n        </div>\n        <div>\n          <h6 class=\"InpLabelClr\">Any interesting things you discovered during this week</h6>\n          <pre class=\"reptTxt\">{{wReports[viewingRept]?.rept?.interesting}}</pre>\n        </div>\n        <div>\n          <h6 class=\"InpLabelClr\">Any other information/issue you wish to communicate with us</h6>\n          <pre class=\"reptTxt\">{{wReports[viewingRept]?.rept?.other}}</pre>\n        </div>\n        <div>\n          <h6 class=\"InpLabelClr\">Snapshot of the week (can be any interesting picture of you life in Japan)</h6>\n          <img class=\"WReptImg\" [src]=\"wReports[viewingRept]?.rept?.img.url\" alt=\"snapshot of the week\">\n        </div>\n      </div>  \n      <p class=\"right\">{{wReports[viewingRept]?.rept?.updated | date:'longDate'}}</p>\n      <div id=\"reptEditBtnArea\">\n        <a id=\"reptEditBtn\" (click)=\"editCreateReptClick(viewingRept)\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">edit</i></a>\n      </div>\n      <div *ngIf=\"isWLMember\" id=\"comments\" class=\"container\">\n        <div class=\"comment row z-depth-1\" *ngFor='let comment of wReports[viewingRept]?.cmnts; let i = index'>\n          <div class=\"col s1 dpImgDiv\">\n              <img class=\"circle responsive-img dpImg\" [src]=\"comment.by.DP.url\" alt=\"comment.by.name\">\n          </div>\n          <div class=\"col s11 cmtOptionsArea\">\n              <p>{{comment.by.name}}<span class=\"right\">{{comment.updated | date:'longDate'}}</span></p>\n              <p>{{comment.body}}</p>\n              <div id=\"cmtOptions\" *ngIf=\"comment.by._id == decodedToken._id\" class=\"fixed-action-btn horizontal\">\n                <a class=\"btn-floating red\"><i class=\"material-icons\">more_horiz</i></a>\n                <ul>\n                  <li><a (click)='editComment(i)' class=\"btn-floating btn-small yellow darken-1\"><i class=\"material-icons\">edit</i></a></li>\n                  <li><a (click)='deleteComment(i)' class=\"btn-floating btn-small red\"><i class=\"material-icons\">delete</i></a></li>\n                </ul>\n              </div>\n          </div>\n        </div>\n        <form (submit)='createCommentSubmit(cmtForm.valid)' #cmtForm=ngForm>\n          <div class=\"input-field\">\n            <label for=\"editingComment\">Comment</label>\n            <textarea id=\"editingComment\" class=\"materialize-textarea\" name=\"body\" [(ngModel)]=\"newCmt\" #editingComment=\"ngModel\" required></textarea>\n            <div [hidden]= \"editingComment.valid || (editingComment.pristine && !cmtForm.submitted)\" class=\"red-text\">\n              Please input the daily report body.\n            </div>\n            <button type=\"submit\" class=\"btn btn-submit\">Comment<i class=\"material-icons right\">send</i></button>\n          </div>\n        </form>\n      </div>\n    </div>\n </div>\n</div>\n\n<div id=\"modalRept\" class=\"modal modal-fixed-footer\" materialize=\"modal\" [materializeActions]=\"modalReptActions\">\n  <div class=\"modal-content\">\n    <h4>Create/Edit weekly report</h4>\n    <form (ngSubmit)=\"upsertWeeklyReport(formRpt)\" #formRpt=ngForm>\n      <div class=\"row\">\n        <div class=\"col s6\">\n          <div class=\"input-field\">\n            <label for=\"sDate\" class=\"active\">Start Date</label>\n            <input id=\"sDate\" type=\"text\" name=\"sDate\" [(ngModel)]=\"upsertWrept.week.sDate\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 30, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\" #reptSDate=\"ngModel\" required>\n            <div [hidden]= \"reptSDate.valid || (reptSDate.pristine && !formRpt.submitted)\" class=\"red-text\">\n                Please input the week start date.\n              </div>\n          </div>\n        </div>\n        <div class=\"col s6\">\n          <div class=\"input-field\">\n            <label for=\"eDate\" class=\"active\">End Date</label>\n            <input id=\"eDate\" type=\"text\" name=\"eDate\" [(ngModel)]=\"upsertWrept.week.eDate\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 30, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\" #reptEDate=\"ngModel\" required>\n            <div [hidden]= \"reptEDate.valid || (reptEDate.pristine && !formRpt.submitted)\" class=\"red-text\">\n                Please input the week end date.\n              </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"input-field\">\n        <p class=\"InpLabelClr\">Difficulty level of the project: X our of 10 (10 being the highest)</p>\n        <p class=\"range-field\">\n          <input id=\"difficulty\" type=\"range\" min='0' max='10' name=\"difficulty\" [(ngModel)]=\"upsertWrept.rept.difficulty\" #difficulty=\"ngModel\" required>\n        </p>\n        <div [hidden]= \"difficulty.valid || (difficulty.pristine && !formRpt.submitted)\" class=\"red-text\">\n          Please input a non zero value for difficulty level of the project.\n        </div>\n      </div>\n      <div class=\"input-field\">\n        <label for=\"learnt\">Things you've learnt through the project</label>\n        <textarea id=\"learnt\" class=\"materialize-textarea\" name=\"learnt\" [(ngModel)]=\"upsertWrept.rept.learnt\" #learnt=\"ngModel\" required></textarea>\n        <div [hidden]= \"learnt.valid || (learnt.pristine && !formRpt.submitted)\" class=\"red-text\">\n          Please input the things you've learnt through the project.\n        </div>\n      </div>\n      <div class=\"input-field\">\n        <label for=\"tech\">Languages/Tools/Applications used this week</label>\n        <textarea id=\"tech\" class=\"materialize-textarea\" name=\"tech\" [(ngModel)]=\"upsertWrept.rept.tech\" #tech=\"ngModel\" required></textarea>\n        <div [hidden]= \"tech.valid || (tech.pristine && !formRpt.submitted)\" class=\"red-text\">\n          Please input the Languages/Tools/Applications used this week.\n        </div>\n      </div>\n      <div class=\"input-field\">\n        <label for=\"supQuery\">Any questions/concerns you want to ask to your supervisor</label>\n        <textarea id=\"supQuery\" class=\"materialize-textarea\" name=\"supQuery\" [(ngModel)]=\"upsertWrept.rept.supQuery\"></textarea>\n      </div>\n      <div class=\"input-field\">\n        <label for=\"interesting\">Any interesting things you discovered during this week</label>\n        <textarea id=\"interesting\" class=\"materialize-textarea\" name=\"interesting\" [(ngModel)]=\"upsertWrept.rept.interesting\" #interesting=\"ngModel\" required></textarea>\n        <div [hidden]= \"interesting.valid || (interesting.pristine && !formRpt.submitted)\" class=\"red-text\">\n          Please input any interesting things you discovered during this week.\n        </div>\n      </div>\n      <div class=\"input-field\">\n        <label for=\"other\">Any other information/issue you wish to communicate with us</label>\n        <textarea id=\"other\" class=\"materialize-textarea\" name=\"other\" [(ngModel)]=\"upsertWrept.rept.other\"></textarea>\n      </div>\n      <div>\n        <label for=\"snapshot\">Snapshot of the week (can be any interesting picture of your life in Japan)</label>\n        <div class=\"file-field input-field\">\n          <div class=\"btn\">\n            <span>Image</span>\n            <input type=\"file\" name=\"fileArr\" #WreptImg required>\n          </div>\n          <div class=\"file-path-wrapper\">\n            <input class=\"file-path\" type=\"text\" name=\"upsertFileName\" [(ngModel)]=\"upsertFileName\" placeholder=\"Upload a JPEG or PNG file\" required #fileName=\"ngModel\">\n          </div>\n          <div [hidden]= \"fileName.valid || (fileName.pristine && !formRpt.submitted)\" class=\"red-text\">\n            Please upload a JPEG or PNG image  \n          </div>\n        </div>\n      </div>\n      <input type=\"submit\" #submitReptBtn hidden>\n    </form>\n  </div>\n  <div class=\"modal-footer\">\n    <a (click)=\"invokeReptFrmSubmit()\" class=\"waves-effect waves-green btn-flat\">Save</a>\n    <a class=\"modal-close waves-effect waves-red btn-flat\">Cancel</a>\n  </div>\n</div>\n\n<div id=\"modalCmt\" class=\"modal modal-fixed-footer\" materialize=\"modal\" [materializeActions]=\"modalCmtActions\">\n  <div class=\"modal-content\">\n    <h4>Create/Edit comment</h4>\n    <form (ngSubmit)=\"updateCommentSubmit(formCmtEdit.valid)\" #formCmtEdit=ngForm>\n      <div class=\"input-field\">\n        <label for=\"editingComment\">Comment</label>\n        <textarea id=\"editingComment\" class=\"materialize-textarea\" name=\"body\" [(ngModel)]=\"upsertCmt.body\" #editingComment=\"ngModel\" required></textarea>\n        <div [hidden]= \"editingComment.valid || (editingComment.pristine && !formCmtEdit.submitted)\" class=\"red-text\">\n          Please input the Comment body.\n        </div>\n      </div>\n    </form>\n  </div>\n  <div class=\"modal-footer\">\n    <a (click)=\"formCmtEdit.ngSubmit.emit()\" class=\"modal-close waves-effect waves-green btn-flat\">Save</a>\n    <a class=\"modal-close waves-effect waves-red btn-flat\">Cancel</a>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/weekly-reports/weekly-reports.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeeklyReportsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__ = __webpack_require__("./src/app/services/internshipAPI/internship-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_jwt__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WeeklyReportsComponent = /** @class */ (function () {
    function WeeklyReportsComponent(route, intnshpService) {
        this.route = route;
        this.intnshpService = intnshpService;
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["JwtHelper"]();
        this.modalReptActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.modalCmtActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.wReports = [];
        this.viewingRept = -1;
        this.upsertWrept = { rept: {
                difficulty: 0,
                learnt: '',
                tech: '',
                supQuery: '',
                interesting: '',
                other: ''
            }, week: { sDate: '', eDate: '' }, index: -1 }; // -1 for new/create
        this.upsertCmt = { body: '', index: -1 }; // -1 for new/create
        this.newCmt = '';
        this.isWLMember = false;
        var token = localStorage.getItem('authToken');
        this.decodedToken = this.jwtHelper.decodeToken(token);
    }
    WeeklyReportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.intnshpService.isWLMember().subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('Some error occurred, please try again later', 3000);
                console.log(resp.error);
                return false;
            }
            _this.isWLMember = resp.isWLMember;
        });
        this.intnshpId = this.route.parent.snapshot.paramMap.get('id');
        this.intnshpService.loadWeeklyReports(this.intnshpId).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('Some error occurred');
                console.log(resp.error);
                return false;
            }
            _this.wReports = resp.weeklyReports;
        });
    };
    WeeklyReportsComponent.prototype.onWeekClick = function (index) {
        this.viewingRept = index;
        return false;
    };
    WeeklyReportsComponent.prototype.editCreateReptClick = function (index) {
        if (index != -1) {
            this.upsertWrept.rept = this.wReports[this.viewingRept].rept;
            this.upsertWrept.week = this.wReports[this.viewingRept].week;
            this.upsertWrept.index = this.viewingRept;
        }
        this.modalReptActions.emit({ action: 'modal', params: ['open'] });
    };
    WeeklyReportsComponent.prototype.invokeReptFrmSubmit = function () {
        this.upsertReptSubmitBtn.nativeElement.click();
    };
    WeeklyReportsComponent.prototype.upsertWeeklyReport = function (formData) {
        var _this = this;
        var fileInp = this.WreptImg.nativeElement;
        if (this.upsertWrept.rept.difficulty == 0)
            formData.form.controls['difficulty'].setErrors({ 'incorrect': true });
        if (!fileInp.files || !fileInp.files[0])
            formData.form.controls['upsertFileName'].setErrors({ 'incorrect': true });
        else if (!(/\.(jpg|jpeg|png)$/i).test(fileInp.files[0].name))
            formData.form.controls['upsertFileName'].setErrors({ 'incorrect': true });
        else
            formData.form.controls['upsertFileName'].setErrors(null);
        if (!formData.valid)
            return false;
        var completeFormData = new FormData();
        completeFormData.append('reptIndex', this.upsertWrept.index);
        completeFormData.append('sDate', this.upsertWrept.week.sDate);
        completeFormData.append('eDate', this.upsertWrept.week.eDate);
        completeFormData.append('difficulty', this.upsertWrept.rept.difficulty);
        completeFormData.append('learnt', this.upsertWrept.rept.learnt);
        completeFormData.append('tech', this.upsertWrept.rept.tech);
        completeFormData.append('supQuery', this.upsertWrept.rept.supQuery);
        completeFormData.append('interesting', this.upsertWrept.rept.interesting);
        completeFormData.append('other', this.upsertWrept.rept.other);
        completeFormData.append('weekSnapshot', fileInp.files[0], fileInp.files[0].name);
        this.intnshpService.upsertWeeklyReport(this.intnshpId, completeFormData).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('Some error occurred');
                console.log(resp.error);
                return false;
            }
            if (_this.upsertWrept.index == -1)
                _this.viewingRept++;
            _this.wReports = resp.weeklyReports;
            _this.modalReptActions.emit({ action: 'modal', params: ['close'] });
            formData.form.controls['upsertFileName'].reset();
            fileInp.files = [];
            _this.upsertWrept = { rept: { difficulty: 0, learnt: '', tech: '', supQuery: '', interesting: '', other: '' }, week: { sDate: '', eDate: '' }, index: -1 };
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('Report updated successfully.', 3000);
        });
    };
    WeeklyReportsComponent.prototype.createCommentSubmit = function (isValidForm) {
        var _this = this;
        if (!isValidForm)
            return false;
        var comment = { body: this.newCmt, index: -1 };
        console.log(this.viewingRept);
        this.intnshpService.upsertComment(this.intnshpId, this.viewingRept, comment).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('Some error occurred');
                console.log(resp.error);
                return false;
            }
            _this.wReports[_this.viewingRept].cmnts = resp.comments;
            _this.newCmt = '';
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('comment added successfully.', 3000);
        });
    };
    WeeklyReportsComponent.prototype.editComment = function (index) {
        this.upsertCmt.body = this.wReports[this.viewingRept].cmnts[index].body;
        this.upsertCmt.index = index;
        this.modalCmtActions.emit({ action: 'modal', params: ['open'] });
    };
    WeeklyReportsComponent.prototype.updateCommentSubmit = function (isValidForm) {
        var _this = this;
        if (!isValidForm)
            return false;
        this.intnshpService.upsertComment(this.intnshpId, this.viewingRept, this.upsertCmt).subscribe(function (resp) {
            if (!resp.success) {
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('Some error occurred');
                console.log(resp.error);
                return false;
            }
            _this.wReports[_this.viewingRept].cmnts = resp.comments;
            _this.upsertCmt = { body: '', index: -1 };
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('comment updated successfully.', 3000);
        });
    };
    WeeklyReportsComponent.prototype.deleteComment = function (index) {
        var _this = this;
        if (confirm("are you sure to want to delete this comment?")) {
            this.intnshpService.deleteComment(this.intnshpId, this.viewingRept, index).subscribe(function (resp) {
                if (!resp.success) {
                    Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('Some error occurred');
                    console.log(resp.error);
                    return false;
                }
                _this.wReports[_this.viewingRept].cmnts = resp.comments;
                Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])('comment deleted successfully.', 3000);
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('submitReptBtn'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], WeeklyReportsComponent.prototype, "upsertReptSubmitBtn", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('WreptImg'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], WeeklyReportsComponent.prototype, "WreptImg", void 0);
    WeeklyReportsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-weekly-reports',
            template: __webpack_require__("./src/app/components/weekly-reports/weekly-reports.component.html"),
            styles: [__webpack_require__("./src/app/components/weekly-reports/weekly-reports.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__["a" /* InternshipApiService */]])
    ], WeeklyReportsComponent);
    return WeeklyReportsComponent;
}());



/***/ }),

/***/ "./src/app/components/wifi/wifi.component.css":
/***/ (function(module, exports) {

module.exports = ".fltBtnArea{\r\n    position: relative;\r\n    margin-bottom: 100px;\r\n}\r\n\r\n#WiFiInfoEditBtn {\r\n    position: absolute;\r\n    right: 2%;\r\n    bottom: 0%;\r\n    -webkit-transform: translateY(+50%);\r\n            transform: translateY(+50%);\r\n}\r\n\r\n#WiFiInfoFormActions{\r\n    text-align: center;\r\n    margin-top: 40px;\r\n}"

/***/ }),

/***/ "./src/app/components/wifi/wifi.component.html":
/***/ (function(module, exports) {

module.exports = "<form (submit)=\"upsertWiFiInfo(wifiForm.valid)\" #wifiForm=ngForm>\n  <div class=\"row\">\n    <div *ngIf='isWLMember' class=\"input-field col s12\">\n      <label for=\"cost\">Card Number</label>\n      <input id=\"cost\" name='cost' type=\"text\" [(ngModel)]=\"WiFiInfo.cost\" required [disabled]=\"!editingWiFiInfo\" #cost=\"ngModel\">\n      <div [hidden]= \"cost.valid || (cost.pristine && !wifiForm.submitted) || !editingWiFiInfo\" class=\"red-text\">\n          Please input a valid card number.\n      </div>\n    </div>\n    <div class=\"input-field col s12\">\n      <label for=\"dId\">Device identification number</label>\n      <input id=\"dId\" name='dId' type=\"text\" [(ngModel)]=\"WiFiInfo.dId\" required [disabled]=\"!editingWiFiInfo\" #dId=\"ngModel\">\n      <div [hidden]= \"dId.valid || (dId.pristine && !wifiForm.submitted) || !editingWiFiInfo\" class=\"red-text\">\n          Please input a valid device number.\n      </div>\n    </div>\n    <div class=\"input-field col s12\">\n      <label for=\"agName\">Agency Name</label>\n      <input id=\"agName\" name='name' type=\"text\" [(ngModel)]=\"WiFiInfo.agency.name\" [disabled]=\"!editingWiFiInfo\">\n    </div>\n    <div class=\"input-field col s12\">\n      <label for=\"agEmail\">Agency contact email address</label>\n      <input id=\"agEmail\" name='email' type=\"text\" [(ngModel)]=\"WiFiInfo.agency.email\" [disabled]=\"!editingWiFiInfo\">\n    </div>\n    <div class=\"input-field col s12\">\n      <label for=\"agPhNum\">Agency contact number</label>\n      <input id=\"agPhNum\" name='phNum' type=\"text\" [(ngModel)]=\"WiFiInfo.agency.phNum\" [disabled]=\"!editingWiFiInfo\">\n    </div>\n    <div *ngIf='isWLMember' class=\"input-field col s12\">\n      <label for=\"cmnts\">additional remarks/comments</label>\n      <textarea id=\"cmnts\" class=\"materialize-textarea\" name='cmnts' [(ngModel)]=\"WiFiInfo.cmnts\" [disabled]=\"!editingWiFiInfo\"></textarea>\n    </div>\n    <div class=\"input-field col s6\">\n      <label for=\"sDate\" class=\"active\">Issued on</label>\n      <input id=\"sDate\" type=\"text\" name=\"sDate\" [(ngModel)]=\"WiFiInfo.sDate\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 20, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n    </div>\n    <div class=\"input-field col s6\">\n      <label for=\"rDate\" class=\"active\">Return date</label>\n      <input id=\"rDate\" type=\"text\" name=\"rDate\" [(ngModel)]=\"WiFiInfo.rDate\" class=\"datepicker\" materialize=\"pickadate\" [materializeParams]=\"[{selectYears: 20, selectMonths: true, today: 'Today', clear: 'Clear', close: 'Ok'}]\">\n    </div>\n    <div id=\"WiFiInfoFormActions\" [hidden]=\"!editingWiFiInfo\">\n        <button type=\"submit\" class=\"btn btn-submit\">Save<i class=\"material-icons right\">send</i></button>\n        <button type=\"button\" (click)=\"editingWiFiInfo = false\" class=\"btn red\">Cancel</button>\n    </div>\n  </div>\n</form>\n<div class=\"fltBtnArea\" *ngIf='isWLMember' [hidden]=\"editingWiFiInfo\">\n  <a id=\"WiFiInfoEditBtn\" (click)=\"editingWiFiInfo = true\" class=\"btn-floating btn-large waves-effect waves-light red\" ><i class=\"material-icons\">edit</i></a>\n</div>"

/***/ }),

/***/ "./src/app/components/wifi/wifi.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WifiComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__ = __webpack_require__("./src/app/services/internshipAPI/internship-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WifiComponent = /** @class */ (function () {
    function WifiComponent(route, intnshpService) {
        this.route = route;
        this.intnshpService = intnshpService;
        this.editingWiFiInfo = false;
        this.isWLMember = true;
        this.WiFiInfo = { cost: 0, dId: 0, agency: { name: '', email: '', phNum: '' }, sDate: '', rDate: '', cmnts: '', acptd: true };
    }
    WifiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.intnshpId = this.route.parent.snapshot.paramMap.get('id');
        this.intnshpService.loadWiFiDetails(this.intnshpId).subscribe(function (resp) {
            if (!resp.success) {
                return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Some error occurred, please try again later.");
            }
            if (!resp.wifi.hasOwnProperty('cost')) {
                resp.wifi['cost'] = 0;
                resp.wifi['cmnts'] = '';
                _this.isWLMember = false;
            }
            _this.WiFiInfo = resp.wifi;
            setTimeout(function () {
                Materialize.updateTextFields();
            });
        });
    };
    WifiComponent.prototype.upsertWiFiInfo = function (isValidForm) {
        var _this = this;
        if (!isValidForm) {
            return false;
        }
        this.intnshpService.upsertWiFiDetails(this.intnshpId, this.WiFiInfo).subscribe(function (resp) {
            if (!resp.success) {
                console.log(resp.error);
                return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("some error occurred, please try agin later.", 3000);
            }
            _this.WiFiInfo = resp.wifi;
            _this.editingWiFiInfo = false;
            Object(__WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["b" /* toast */])("Information updated successfully.", 3000);
            setTimeout(function () {
                Materialize.updateTextFields();
            });
        });
    };
    WifiComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-wifi',
            template: __webpack_require__("./src/app/components/wifi/wifi.component.html"),
            styles: [__webpack_require__("./src/app/components/wifi/wifi.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__services_internshipAPI_internship_api_service__["a" /* InternshipApiService */]])
    ], WifiComponent);
    return WifiComponent;
}());



/***/ }),

/***/ "./src/app/directives/equal-validator.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EqualValidatorDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var EqualValidatorDirective = /** @class */ (function () {
    function EqualValidatorDirective(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    EqualValidatorDirective_1 = EqualValidatorDirective;
    Object.defineProperty(EqualValidatorDirective.prototype, "isReverse", {
        get: function () {
            if (!this.reverse)
                return false;
            return this.reverse === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    EqualValidatorDirective.prototype.validate = function (c) {
        // self value
        var v = c.value;
        // control value
        var e = c.root.get(this.validateEqual);
        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                validateEqual: false
            };
        }
        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['validateEqual'];
            if (!Object.keys(e.errors).length)
                e.setErrors(null);
        }
        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validateEqual: false });
        }
        return null;
    };
    EqualValidatorDirective = EqualValidatorDirective_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALIDATORS */], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return EqualValidatorDirective_1; }), multi: true }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Attribute"])('validateEqual')),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Attribute"])('reverse')),
        __metadata("design:paramtypes", [String, String])
    ], EqualValidatorDirective);
    return EqualValidatorDirective;
    var EqualValidatorDirective_1;
}());



/***/ }),

/***/ "./src/app/guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/']);
        }
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__["a" /* AuthService */]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/services/auth/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.loggedInSrc = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["a" /* Subject */]();
        this.loggedIn$ = this.loggedInSrc.asObservable();
    }
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        return this.http.post('http://localhost:3000/user/register', user, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.login = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        return this.http.post('http://localhost:3000/user/authenticate', user, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.loginSuccess = function (data) {
        this.saveToken(data.token);
        this.saveHeaderUserInfo(data.userData);
        this.loadHeaderUserInfo();
    };
    AuthService.prototype.saveHeaderUserInfo = function (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        this.user = userData;
    };
    AuthService.prototype.loadHeaderUserInfo = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        var headerData = { name: this.user.name, DPUrl: this.user.DPUrl };
        this.loggedInSrc.next(headerData);
    };
    AuthService.prototype.saveToken = function (token) {
        localStorage.setItem('authToken', token);
        this.authToken = token;
    };
    AuthService.prototype.loadToken = function () {
        this.authToken = localStorage.getItem('authToken');
    };
    AuthService.prototype.isLoggedIn = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["tokenNotExpired"])("authToken");
    };
    AuthService.prototype.destroyToken = function () {
        this.authToken = null;
        localStorage.removeItem('authToken');
    };
    AuthService.prototype.destroyUserInfo = function () {
        this.authToken = null;
        localStorage.removeItem('user');
    };
    //User Protected Routes request below 
    AuthService.prototype.getUserInfo = function () {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.get('http://localhost:3000/user/userInfo', { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.updateUserInfo = function (userInfo) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/user/updateUserInfo', userInfo, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.updateDisplayPic = function (uploadData) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/user/updateDisplayPic', uploadData, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.initPassword = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        return this.http.post('http://localhost:3000/user/initPassword', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.resetPassword = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        return this.http.post('http://localhost:3000/user/resetPassword', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.updatePassword = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        return this.http.post('http://localhost:3000/user/updatePassword', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/autocompleteAPI/autocomplete-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutocompleteApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AutocompleteApiService = /** @class */ (function () {
    function AutocompleteApiService(http) {
        this.http = http;
    }
    AutocompleteApiService.prototype.loadToken = function () {
        this.authToken = localStorage.getItem('authToken');
    };
    AutocompleteApiService.prototype.getCompanySuggestions = function (searchTerm) {
        this.loadToken();
        var data = { searchTerm: searchTerm };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/company/suggestions', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    AutocompleteApiService.prototype.getCandidateSuggestions = function (searchTerm) {
        this.loadToken();
        var data = { searchTerm: searchTerm };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/user/suggestions', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    AutocompleteApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], AutocompleteApiService);
    return AutocompleteApiService;
}());



/***/ }),

/***/ "./src/app/services/companyAPI/company-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CompanyApiService = /** @class */ (function () {
    function CompanyApiService(http) {
        this.http = http;
    }
    CompanyApiService.prototype.loadToken = function () {
        this.authToken = localStorage.getItem('authToken');
    };
    //User Protected Routes request below 
    CompanyApiService.prototype.getCmpInfo = function () {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.get('http://localhost:3000/company/info', { headers: headers }).map(function (res) { return res.json(); });
    };
    CompanyApiService.prototype.getCmpNames = function () {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.get('http://localhost:3000/company/companyNames', { headers: headers }).map(function (res) { return res.json(); });
    };
    CompanyApiService.prototype.updateCmpInfo = function (cmpInfo) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/company/updateInfo', cmpInfo, { headers: headers }).map(function (res) { return res.json(); });
    };
    CompanyApiService.prototype.updateLogo = function (uploadData) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/company/updateLogo', uploadData, { headers: headers }).map(function (res) { return res.json(); });
    };
    CompanyApiService.prototype.addAdmin = function (newAdmin) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/company/registerAdmin', newAdmin, { headers: headers }).map(function (res) { return res.json(); });
    };
    CompanyApiService.prototype.createCompany = function (newCmp) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/company/register', newCmp, { headers: headers }).map(function (res) { return res.json(); });
    };
    CompanyApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], CompanyApiService);
    return CompanyApiService;
}());



/***/ }),

/***/ "./src/app/services/internshipAPI/internship-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InternshipApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InternshipApiService = /** @class */ (function () {
    function InternshipApiService(http) {
        this.http = http;
    }
    InternshipApiService.prototype.loadToken = function () {
        this.authToken = localStorage.getItem('authToken');
    };
    InternshipApiService.prototype.getIntnshipDetails = function (id) {
        this.loadToken();
        var data = { internshipId: id };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/info', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.getInternships = function (year) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        var data = { year: year };
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/yearInternships', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.createInternship = function (newIntnshp) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/initInternship', newIntnshp, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.updateBasicInfo = function (intnshpData) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/upsertBasicInfo', intnshpData, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.loadWeeklyReports = function (intnshpId) {
        this.loadToken();
        var data = { intnshpId: intnshpId };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/getWeeklyReports', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.upsertWeeklyReport = function (internshipId, formData) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('x-access-token', this.authToken);
        headers.append('internship-id', internshipId);
        return this.http.post('http://localhost:3000/internship/updateCandidateWeeklyReport', formData, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.upsertComment = function (intnshpId, wReptIndex, data) {
        data['intnshpId'] = intnshpId;
        data['wReptIndex'] = wReptIndex;
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/updateWeeklyReportComment', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.deleteComment = function (intnshpId, wReptIndex, cmtIndex) {
        var data = { intnshpId: intnshpId, wReptIndex: wReptIndex, cmtIndex: cmtIndex };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/deleteComment', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.loadSuicaDetails = function (intnshpId) {
        var data = { intnshpId: intnshpId };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/getSuicaDetails', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.upsertSuicaDetails = function (intnshpId, suica) {
        var data = { intnshpId: intnshpId, suica: suica };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/updateSuicaDetails', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.loadWiFiDetails = function (intnshpId) {
        var data = { intnshpId: intnshpId };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/getWifiDetails', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.upsertWiFiDetails = function (intnshpId, wifi) {
        var data = { intnshpId: intnshpId, wifi: wifi };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/updateWIfiDetails', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.loadStipends = function (intnshpId) {
        var data = { intnshpId: intnshpId };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/getPayments', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.upsertStipend = function (intnshpId, payment) {
        var data = { intnshpId: intnshpId, payment: payment };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/updatePayment', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.deleteStipend = function (intnshpId, stipendIndex) {
        var data = { intnshpId: intnshpId, stipendIndex: stipendIndex };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/deletePayment', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.markStipendAcptd = function (intnshpId, stipendIndex) {
        var data = { intnshpId: intnshpId, stipendIndex: stipendIndex };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/markPaymentAccepted', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.loadAccommodationDetails = function (intnshpId) {
        var data = { intnshpId: intnshpId };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/getAccommodationDetails', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.upsertAccommodationDetails = function (intnshpId, accommodation) {
        var data = { intnshpId: intnshpId, accommodation: accommodation };
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/internship/updateAccommodationDetails', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService.prototype.isWLMember = function () {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.get('http://localhost:3000/user/isWLMember', { headers: headers }).map(function (res) { return res.json(); });
    };
    InternshipApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], InternshipApiService);
    return InternshipApiService;
}());



/***/ }),

/***/ "./src/app/services/sitelinkAPI/sitelink-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SitelinkApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SitelinkApiService = /** @class */ (function () {
    function SitelinkApiService(http) {
        this.http = http;
    }
    SitelinkApiService.prototype.loadToken = function () {
        this.authToken = localStorage.getItem('authToken');
    };
    SitelinkApiService.prototype.validateAccInit = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        return this.http.post('http://localhost:3000/user/validateSitelink', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    SitelinkApiService.prototype.validatePassReset = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        return this.http.post('http://localhost:3000/user/validateSitelink', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    SitelinkApiService.prototype.validateEmail = function (data) {
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"];
        headers.append('Content-Type', "application/json");
        headers.append('x-access-token', this.authToken);
        return this.http.post('http://localhost:3000/user/validateSitelink', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    SitelinkApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], SitelinkApiService);
    return SitelinkApiService;
}());



/***/ }),

/***/ "./src/app/services/validation/validation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidationService = /** @class */ (function () {
    function ValidationService() {
    }
    ValidationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ValidationService);
    return ValidationService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map