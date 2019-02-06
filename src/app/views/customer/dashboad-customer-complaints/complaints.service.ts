import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  private baseURL = environment.API.BaseURL;

  constructor(private http: HttpClient, private utilities: UtilitiesService) { }

  // Customer complaints
  submitComplaint(payload: ComplaintsModel) {
    const Path = this.baseURL + `issues`;
    this.utilities.del_frmBody(payload);
    console.log(payload);
    return this.http.post<ComplaintsModel>(Path, payload);
  }

}
export interface ComplaintsModel {
  title: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  accountNumber?: string;
  email: string;
  phoneNo: any;
  alternatePhone?: any;
  status?: any;
  lastFourDigit?: any;
  transactionType?: any;
  transactionAmount?: any;
  transactionAmountTwo?: any;
  transactionAmountThree?: any;
  transactionDate?: any;
  atmUsed?: string;
  cardComplaintType?: any;
  complaintDescription?: any;
  eChannelMedium?: any;
  serviceType?: number;
  billType?: any;
  referenceId?: any;
  smartCardNumber?: any;
  unionMobile?: any;
  recipientAccountNo?: any;
  recipientName?: any;
  posMerchantName?: any;
  websiteUsed?: any;
  ussdPhoneNo?: any;
  beneficiaryPhoneNo?: any;
  recipientBank?: any;
  merchantCode?: any;
  isCustomer?: any;
  disappointedService?: any;
  branchIncident?: any;
  bankNameId?: any;
  sourceId?: number;
  unionatmId?: any;
  branchListId?: any;
  serviceProviderId?: any;
  channelId?: number; // whether atm dispense error, card issue etc
  feedbackcategoryId?: number; // Feedback categoryId
  cardVariantId?: number;
  currencyTypeId?: number;
}

