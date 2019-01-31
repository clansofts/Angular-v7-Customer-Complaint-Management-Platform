import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  private baseURL = environment.API.BaseURL;

  constructor(private http: HttpClient) { }
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
      'email': form.emailAddress,
      'phoneNumber': form.phone,
      'cardVariantId': form.cardVariant,
      'lastFourDigit': form.cardNumber,

      'tansactionType': form.transCount.id, // single or multiple

      'currencyTypeId': form.currencyType,
      'transactionAmount': form.amount.amount1,
      'transactionAmountTwo': form.amount.amount2,
      'transactionAmountThree': form.amount.amount3,
      'transactionDate': form.transDate,
      'atmUsed': form.atmUsed.id,

      /* for testing uncommented bcos user used union atm */
      //    'bankNameId': null, // bank used

      'unionATMListId': form.location.atmId,
      'cardComplaintType': form.cardVariant,
      'sourceId': 1, // fixed web
      'channelId': channel, // atm dispense error
      'feedbackcategoryId': form.feedbackId, // Feedback categoryId
    };
    console.log(body);
    return this.http.post<any>(Path, body);
  }
}

