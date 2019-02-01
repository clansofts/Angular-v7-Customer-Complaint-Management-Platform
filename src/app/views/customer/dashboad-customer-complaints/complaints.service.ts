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
  // Have to figure out a plan for using this api
  // Can i write a function to delete null objects before submiting.
  //  This way I can use one submit function

  /* Testing ATM COMPLAINTS payload */
  submitComplaint(form, channel) {
    console.log(form);
    const Path = this.baseURL + `issues`;
    const body: any = {
      'title': 1, // Mr, Mrs!
      'firstName': form.firstName,
      'lastName': form.lastName,
      'middleName': '',
      //      'accountNumber': 5671240998,
      'email': form.emailAddress,
      'phoneNo': form.phone,
      //      'alternatePhone': '',
      //      'status': parseInt('', 10),
      'lastFourDigit': form.cardNumber,
      'transactionType': form.transCount.id, // single or multiple
      'transactionAmount': form.amount.amount1,
      'transactionAmountTwo': form.amount.amount2,
      'transactionAmountThree': form.amount.amount3,
      'transactionDate': this.utilities.formatDate(form.transDate), // Format sample: '2019-01-29 09:40:00'
      'atmUsed': form.atmUsed.id,
      'cardComplaintType': parseInt(form.cardVariant, 10),
      //      'complaintDescription': 'The Atm did not dispense but debited me ',
      //      'eChannelMedium': parseInt('', 10),
      //      'serviceType': parseInt('', 10),
      //      'billType': 2,
      //      'referenceId': 'REF-234AZXXP',
      //      'smartCardNumber': 156371872,
      //      'unionMobile': parseInt('', 10),
      //      'recipientAccountNo': parseInt('', 10),
      //      'recipientName': 'Oyegun Abiola',
      //      'posMerchantName': 'GL-Gold',
      //      'websiteUsed': 'www.glgold.co.uk',
      //      'ussdPhoneNo': parseInt('', 10),
      //      'beneficiaryPhoneNo': parseInt('', 10),
      //      'recipientBank': parseInt('', 10),
      //      'merchantCode': 'tdf-3344',
      //      'isCustomer': parseInt('', 10),
      //      'disappointedService': parseInt('', 10),
      //      'branchIncident': parseInt('', 10),
      //      'bankNameId': parseInt(form.bankused.bankId, 10), // bank used
      'sourceId': 1, // fixed web
      'unionatmId': form.location.atmId,
      //      'branchListId': parseInt('', 10),
      //      'serviceProviderId': parseInt('', 10),
      'channelId': channel, // atm dispense error
      'feedbackcategoryId': form.feedbackId, // Feedback categoryId
      'cardVariantId': parseInt(form.cardVariant, 10),
      'currencyTypeId': parseInt(form.currencyType, 10),
    };
    console.log(body);
    return this.http.post<any>(Path, body);
  }
}

