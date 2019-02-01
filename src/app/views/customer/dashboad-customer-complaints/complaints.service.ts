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
  submitComplaint(form, channel) {
    const Path = this.baseURL + `issues`;
    const body: any = {
      'title': 1, // Mr, Mrs!
      'firstName': form.firstName,
      'lastName': form.lastName,
      'middleName': '',
      'accountNumber': '',
      'email': form.emailAddress,
      'phoneNo': form.phone,
      'alternatePhone': '',
      'status': '',
      'lastFourDigit': form.cardNumber,
      'transactionType': form.transCount.id,
      'transactionAmount': form.amount.amount1,
      'transactionAmountTwo': form.amount.amount2,
      'transactionAmountThree': form.amount.amount3,
      'transactionDate': this.utilities.formatDate(form.transDate), // Format sample: '2019-01-29'
      'atmUsed': form.atmUsed.id,
      'cardComplaintType': parseInt(form.cardVariant, 10),
      'complaintDescription': '',
      'eChannelMedium': '',
      'serviceType': '',
      'billType': '',
      'referenceId': '',
      'smartCardNumber': '',
      'unionMobile': '',
      'recipientAccountNo': '',
      'recipientName': '',
      'posMerchantName': '',
      'websiteUsed': '',
      'ussdPhoneNo': '',
      'beneficiaryPhoneNo': '',
      'recipientBank': '',
      'merchantCode': '',
      'isCustomer': '',
      'disappointedService': '',
      'branchIncident': '',
      'bankNameId': form.bankused.bankId,
      'sourceId': 1, // fixed for web
      'unionatmId': form.location.atmId,
      'branchListId': '',
      'serviceProviderId': '',
      'channelId': channel, // whether atm dispense error, card issue etc
      'feedbackcategoryId': form.feedbackId, // Feedback categoryId
      'cardVariantId': parseInt(form.cardVariant, 10),
      'currencyTypeId': parseInt(form.currencyType, 10),
    };
    this.utilities.del_frmBody(body);
    console.log(body);
    return this.http.post<any>(Path, body);
  }
}

