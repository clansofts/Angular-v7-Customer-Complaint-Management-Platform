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
    // Trim payload
    this.utilities.trim(payload);
    return this.http.post<ComplaintsModel>(Path, payload);
  }

}
export class ComplaintsModel {
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

  constructor(obj?: any, Func?: any) {
    this.title = 1,
      this.firstName = obj && obj.firstName || null,
      this.lastName = obj && obj.lastName || null,
      this.middleName = obj && obj.middleName || null,
      this.accountNumber = obj && obj.acctNumber || null,
      this.email = obj && obj.emailAddress || null,
      this.phoneNo = obj && obj.phone || null,
      this.alternatePhone = obj && obj.altphone || null,
      this.lastFourDigit = obj && obj.cardNumber || null,
      this.transactionType = obj && obj.transCount.id || null,
      this.transactionAmount = obj && obj.amount.amount1 || null,
      this.transactionAmountTwo = obj && obj.amount.amount2 || null,
      this.transactionAmountThree = obj && obj.amount.amount3 || null,
      this.transactionDate = obj && obj.transDate && Func.formatDate(obj.transDate) || Func.todaysDate, // Format'2019-01-29'
      this.atmUsed = obj && obj.atmUsed.id || null,
      this.cardComplaintType = obj && obj.cardComplaintType || null,
      this.complaintDescription = obj && obj.complaintDescription || null,
      this.channelId = obj && obj.channel_ID || null,
      this.feedbackcategoryId = obj && obj.feedbackId,
      this.cardVariantId = obj && obj.cardVariant || null,
      this.currencyTypeId = obj && obj.currencyType || null,
      this.eChannelMedium = obj && obj.eMedium.id || null,
      this.billType = obj && obj.billType || null,
      this.serviceType = obj && obj.eChannels.id || null,
      this.referenceId = obj && obj.referenceID || null,
      this.smartCardNumber = obj && obj.smartCardNumber || null,
      this.unionMobile = obj && obj.unionMobilePhone || null,
      this.recipientAccountNo = obj && obj.recipientsAcctNo || null,
      this.recipientName = obj && obj.recipientsName || null,
      this.posMerchantName = obj && obj.posMerchantName || null,
      this.websiteUsed = obj && obj.websiteURL || null,
      this.ussdPhoneNo = obj && obj.ussdPhoneNo || null,
      this.beneficiaryPhoneNo = obj && obj.beneficiaryPhoneNo || null,
      this.recipientBank = obj && obj.recipientBank || null,
      this.merchantCode = obj && obj.merchantCode || null,
      this.isCustomer = obj && obj.isCustomer || null, // New
      this.disappointedService = obj && obj.disappointedService || null, // New
      this.branchIncident = obj && obj.branchIncident || null, // New
      this.bankNameId = obj && obj.bankused.bankId || null,
      this.sourceId = 1 || null,
      this.unionatmId = obj && obj.unionatmId.atmId || null,
      this.branchListId = obj && obj.branchListId || null,
      this.serviceProviderId = obj && obj.serviceProvider.serviceProviderId || null;
  }
}

