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
      this.firstName = obj.firstName,
      this.lastName = obj.lastName,
      this.middleName = obj.middleName,
      this.accountNumber = obj.acctNumber,
      this.email = obj.emailAddress,
      this.phoneNo = obj.phone,
      this.alternatePhone = obj.altphone,
      this.lastFourDigit = obj.cardNumber,
      this.transactionType = obj.transCount.id,
      this.transactionAmount = obj.amount.amount1,
      this.transactionAmountTwo = obj.amount.amount2,
      this.transactionAmountThree = obj.amount.amount3,
      this.transactionDate = Func.formatDate(obj.transDate), // Format'2019-01-29'
      this.atmUsed = obj.atmUsed,
      this.cardComplaintType = obj.cardComplaintType,
      this.complaintDescription = obj.complaintDescription,
      this.sourceId = 1, // fixed for web
      this.channelId = obj.channel_ID,
      this.feedbackcategoryId = obj.feedbackId,
      this.cardVariantId = obj.cardVariant,
      this.currencyTypeId = obj.currencyType,
      this.eChannelMedium = obj.eMedium.id,
      this.billType = obj.billType,
      this.serviceType = obj.eChannels.id,
      this.referenceId = obj.referenceID,
      this.smartCardNumber = obj.smartCardNumber,
      this.unionMobile = obj.unionMobilePhone,
      this.recipientAccountNo = obj.recipientsAcctNo,
      this.recipientName = obj.recipientsName,
      this.posMerchantName = obj.posMerchantName,
      this.websiteUsed = obj.websiteURL,
      this.ussdPhoneNo = obj.ussdPhoneNo,
      this.beneficiaryPhoneNo = obj.beneficiaryPhoneNo,
      this.recipientBank = '',
      this.merchantCode = '',
      this.serviceProviderId = obj.serviceProvider.serviceProviderId;
  }
}

