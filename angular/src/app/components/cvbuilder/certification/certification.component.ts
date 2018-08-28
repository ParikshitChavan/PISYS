

import { Component, OnInit } from '@angular/core';

import { toast, MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

import { CvBuilderService } from '../../../services/cvbuilder/cvbuilder.service';
import { Certification } from '../../../model/certification';

declare let Materialize: any;

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();   

  certificates: Certification[] = [];  // stores all certificate if user
  newCertificate: Certification;       // certificate being created or edit
  isValidCurrentCertificate;         // object to store validation flag for forms
  currentRecordID;                  //object id being deleted
  canEdit: boolean = false;         // access control to allow or disallow user from adding/ deleting records

  modalPurpose: string = 'add'; // add - adding a new entry, edit - editing new entry. delete - confirmation message

  isUserHasCv: boolean = false;

  constructor(public cvBuilderService: CvBuilderService) { }

  /**
   * initialize the component by setting certificate and access control for the page.
   * @memberof CertificateComponent
   */
  ngOnInit() {
    this.cvBuilderService.isUserHasCv.subscribe(this.setHasCv)
    this.cvBuilderService.certifications.subscribe(this.setCertificates);
    this.cvBuilderService.accessControl.subscribe(canEdit => this.canEdit = canEdit);
    this.setNewCertificate(this.getDummyCertificate());
    this.setValidationObject();
  }
  
  setHasCv = hasCv => {
    this.isUserHasCv = hasCv;
  }

  /**
   * set certificate return by subscriber
   * @memberof CertificateComponent
   */
  setCertificates = certificate => {
    this.certificates = certificate;
  }

  /**
   * set modal purpose to add, set new certificate, validations object and opens the modal
   * @memberof CertificateComponent
   */
  createCertificate() {
    this.modalPurpose = 'add';
    this.setNewCertificate(this.getDummyCertificate());
    this.setValidationObject();
    this.openModal();
  }

  /**
   * sets modal purpose to edit and sets Certificate, validation object
   * emits actions for chips & then opens the modal
   * @param {Certificate} certificate
   * @memberof CertificateComponent
   */
  openEditCertificate(certificate: Certification) {
    this.modalPurpose = 'edit';
    this.setValidationObject();
    this.setNewCertificate(certificate);
    setTimeout(() => {
      this.openModal();
    });
    setTimeout(() => {
      Materialize.updateTextFields();
    });
  }

  /**
   * sets modal purpose to delete and opens the modal
   * @param {*} certificateId
   * @memberof CertificateComponent
   */
  showDeleteConfirmDialigue(certificateId) {
    this.modalPurpose = 'delete';
    this.currentRecordID = certificateId;
    setTimeout(() => {
      this.openModal();
    });  }

  
  /**
   *  opens a modal
   * @memberof CertificateComponent
   */
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  /**
   *
   * @memberof CertificateComponent
   */
  closeModal() {
    this.modalPurpose = 'add';
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  /**
   *  sets new expereince object with passed Certificate
   * @param {Certificate} certificate
   * @memberof CertificateComponent
   */
  setNewCertificate(certificate: Certification) {
    this.newCertificate =  {
      _id: certificate._id,
      title: certificate.title,
      link: certificate.link
    }
  }

  /**
   * initialize valition object with all fields set to true
   * @memberof CertificateComponent
   */
  setValidationObject() {
    this.isValidCurrentCertificate = {
      title: true,
      link: true
    }
  }


  /**
   * returns empty expereince object
   * @returns
   * @memberof CertificateComponent
   */
  getDummyCertificate() {
    return { _id: '', title: '', link: ''};
  }

  
  /**
   * @param {Certificate[]} certificate
   * @param {string} recordId
   * @returns
   * @memberof CertificateComponent
   */
  getCertificateToSow(certificate: Certification[], recordId: string) {
    return certificate.find(record => record._id == recordId);
  }

  /**
   * @param {*} event
   * @param {*} field
   * @memberof CertificateComponent
   */
  onInputChange(event, field) {
    this.newCertificate[field] = event.target.value;
    this.isValidCurrentCertificate[field] = true;
  }

  /**
   *  check if string is valid or no
   * @param {string} input
   * @returns boolean
   * @memberof CertificateComponent
   */
  isInputValid (input: string) {
    return (input && input.trim() && input !== undefined) ? true : false;
  }

  validURL(str) {
    var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    return regex.test(str);
  }

  /**
   * checks if form is valid
   * @param {Certificate} certificate
   * @returns boolean
   * @memberof CertificateComponent
   */
  isFormValid(certificate: Certification) {
    let formValid = true;

    if (!this.isInputValid(certificate.title)) {
      this.isValidCurrentCertificate.title = false;
      formValid = false;
    } else {
      this.isValidCurrentCertificate.title = true;
    }

    if (!this.validURL(certificate.link)) {
      this.isValidCurrentCertificate.link = false;
      formValid = false;
    } else {
      this.isValidCurrentCertificate.link = true;
    }
    
    return formValid;
  }


  /**
   *
   * @memberof CertificateComponent
   */
  submitCertificate () {
    if (this.isFormValid(this.newCertificate)) {
      switch (this.modalPurpose) {
       case 'add':
          this.addCertificate();
          break;
       case 'edit':
          this.updateCertificate() 
          break;
      }
     }
   }
   

  /**
   *
   * @memberof CertificateComponent
   */
  addCertificate() {
    this.cvBuilderService.addCertificate(this.newCertificate).then(this.onCertificateSubmitSuccess).catch(this.onCertificateSubmitFailed);
  }

  /**
   *
   * @memberof CertificateComponent
   */
  updateCertificate() {
    this.cvBuilderService.updateCertificate(this.newCertificate).then(this.onCertificateSubmitSuccess).catch(this.onCertificateSubmitFailed);
  }

  /**
   *
   * @memberof CertificateComponent
   */
  deleteCertificate() {
    this.cvBuilderService.deleteCertificate(this.currentRecordID).then(this.onCertificateDeleteSuccess).catch(this.onCertificateSubmitFailed);
  }

  /**
   *
   *
   * @memberof CertificateComponent
   */
  onCertificateSubmitSuccess = (response) => {
    response.success ? this.cvBuilderService.setCertifications(response.certificates) : false;
    toast(response.message, 2000);
    this.closeModal();
  }

  /**
   *
   * @memberof CertificateComponent
   */
  onCertificateDeleteSuccess = (response) => {
    this.closeModal();
    toast(response.message, 2000);
    if (response.success) {
      this.cvBuilderService.setCertifications(response.certificates);
      this.currentRecordID = null;
    }
  }

  /**
   *
   * @memberof CertificateComponent
   */
  onCertificateSubmitFailed = (err) => {
    toast(err, 2000);
  }

}
